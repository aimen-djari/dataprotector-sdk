import { multiaddr as Multiaddr } from '@multiformats/multiaddr';
import { DEFAULT_DATA_NAME } from '../../config/config.js';
import { add } from '../../services/ipfs.js';
import {
  createZipFromObject,
  ensureDataObjectIsValid,
  extractDataSchema,
} from '../../utils/data.js';
import { ValidationError, WorkflowError } from '../../utils/errors.js';
import { getLogger } from '../../utils/logger.js';
import { getEventFromLogs } from '../../utils/transactionEvent.js';
import {
  stringSchema,
  throwIfMissing,
  urlSchema,
} from '../../utils/validators.js';
import {
  DataObject,
  IpfsNodeAndGateway,
  ProtectDataParams,
  ProtectedDataWithSecretProps,
} from '../types/index.js';
import {
  DataProtectorContractConsumer,
  IExecConsumer,
} from '../types/internalTypes.js';
import { getContract } from './smartContract/getContract.js';

const logger = getLogger('protectData');

export const protectData = async ({
  iexec = throwIfMissing(),
  dataprotectorContractAddress,
  ipfsNode,
  ipfsGateway,
  data,
  name = DEFAULT_DATA_NAME,
  onStatusUpdate = () => {},
}: IExecConsumer &
  DataProtectorContractConsumer &
  IpfsNodeAndGateway &
  ProtectDataParams): Promise<ProtectedDataWithSecretProps> => {
  const vName = stringSchema().label('name').validateSync(name);
  const vIpfsNodeUrl = urlSchema().label('ipfsNode').validateSync(ipfsNode);
  const vIpfsGateway = urlSchema()
    .label('ipfsGateway')
    .validateSync(ipfsGateway);
  let vData: DataObject;
  try {
    ensureDataObjectIsValid(data);
    vData = data;
  } catch (e: any) {
    throw new ValidationError(`data is not valid: ${e.message}`);
  }

  try {
    onStatusUpdate({
      title: 'EXTRACT_DATA_SCHEMA',
      isDone: false,
    });
    const schema = await extractDataSchema(vData).catch((e: Error) => {
      throw new WorkflowError('Failed to extract data schema', e);
    });
    onStatusUpdate({
      title: 'EXTRACT_DATA_SCHEMA',
      isDone: true,
    });

    onStatusUpdate({
      title: 'CREATE_ZIP_FILE',
      isDone: false,
    });
    let file;
    await createZipFromObject(vData)
      .then((zipFile: Uint8Array) => {
        file = zipFile;
      })
      .catch((e: Error) => {
        throw new WorkflowError('Failed to serialize data object', e);
      });
    onStatusUpdate({
      title: 'CREATE_ZIP_FILE',
      isDone: true,
    });

    onStatusUpdate({
      title: 'CREATE_ENCRYPTION_KEY',
      isDone: false,
    });
    const encryptionKey = iexec.dataset.generateEncryptionKey();
    onStatusUpdate({
      title: 'CREATE_ENCRYPTION_KEY',
      isDone: true,
      payload: {
        encryptionKey,
      },
    });

    onStatusUpdate({
      title: 'ENCRYPT_FILE',
      isDone: false,
    });
    const encryptedFile = await iexec.dataset
      .encrypt(file, encryptionKey)
      .catch((e: Error) => {
        throw new WorkflowError('Failed to encrypt data', e);
      });
    const checksum = await iexec.dataset
      .computeEncryptedFileChecksum(encryptedFile)
      .catch((e: Error) => {
        throw new WorkflowError('Failed to compute encrypted data checksum', e);
      });
    onStatusUpdate({
      title: 'ENCRYPT_FILE',
      isDone: true,
    });

    onStatusUpdate({
      title: 'UPLOAD_ENCRYPTED_FILE',
      isDone: false,
    });
    const cid = await add(encryptedFile, {
      ipfsNode: vIpfsNodeUrl,
      ipfsGateway: vIpfsGateway,
    }).catch((e: Error) => {
      throw new WorkflowError('Failed to upload encrypted data', e);
    });
    const multiaddr = `/ipfs/${cid}`;
    onStatusUpdate({
      title: 'UPLOAD_ENCRYPTED_FILE',
      isDone: true,
      payload: {
        cid,
      },
    });

    const { provider, signer, txOptions } =
      await iexec.config.resolveContractsClient();

    const multiaddrBytes = Multiaddr(multiaddr).bytes;
    const ownerAddress = await signer.getAddress();

    onStatusUpdate({
      title: 'DEPLOY_PROTECTED_DATA',
      isDone: false,
    });
    const dataProtectorContract = await getContract(
      iexec,
      dataprotectorContractAddress
    );
    const transactionReceipt = await dataProtectorContract
      .createDatasetWithSchema(
        ownerAddress,
        vName,
        JSON.stringify(schema),
        multiaddrBytes,
        checksum,
        txOptions
      )
      .then((tx) => tx.wait())
      .catch((e: Error) => {
        throw new WorkflowError(
          'Failed to create protected data into smart contract',
          e
        );
      });

    const specificEventForPreviousTx = getEventFromLogs(
      'DatasetSchema',
      transactionReceipt.logs,
      { strict: true }
    );
    const protectedDataAddress = specificEventForPreviousTx.args?.dataset;

    const txHash = transactionReceipt.hash;
    const block = await provider.getBlock(transactionReceipt.blockNumber);
    const creationTimestamp = block.timestamp;

    onStatusUpdate({
      title: 'DEPLOY_PROTECTED_DATA',
      isDone: true,
      payload: {
        address: protectedDataAddress,
        explorerUrl: `https://explorer.iex.ec/bellecour/dataset/${protectedDataAddress}`,
        owner: ownerAddress,
        creationTimestamp: String(creationTimestamp),
        txHash,
      },
    });

    // share secret with scone SMS
    onStatusUpdate({
      title: 'PUSH_SECRET_TO_SMS',
      isDone: false,
      payload: {
        teeFramework: 'scone',
      },
    });
    await iexec.dataset
      .pushDatasetSecret(protectedDataAddress, encryptionKey, {
        teeFramework: 'scone',
      })
      .catch((e: Error) => {
        throw new WorkflowError(
          'Failed to push protected data encryption key',
          e
        );
      });
    onStatusUpdate({
      title: 'PUSH_SECRET_TO_SMS',
      isDone: true,
      payload: {
        teeFramework: 'scone',
      },
    });

    return {
      name,
      address: protectedDataAddress,
      owner: ownerAddress,
      schema,
      creationTimestamp,
      transactionHash: txHash,
      zipFile: file,
      encryptionKey,
    };
  } catch (e: any) {
    logger.log(e);
    if (e instanceof WorkflowError) {
      throw e;
    } else {
      throw new WorkflowError('Protect data unexpected error', e);
    }
  }
};
