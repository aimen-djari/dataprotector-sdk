import { KnownEnv, getEnvironment } from '@iexec/dataprotector-environments';
import { APP_WHITELIST_ADDRESS_FILE } from '../config/config.js';
import createAddOnlyAppWhitelist from './singleFunction/createAddOnlyAppWhitelist.js';
import { getIExec, saveToFile } from './utils/utils.js';

const main = async () => {
  //const {
  //  WALLET_PRIVATE_KEY, // future whitelist owner
  //  ENV,
  //  DATAPROTECTOR_SHARING_ADDRESS, // env value override
  //} = process.env;
	const WALLET_PRIVATE_KEY='efbc2b9cde7166a88c5001909800c2a730ee900add674cb8c74b0af9d8ba5a64';
	const DATAPROTECTOR_SHARING_ADDRESS='0xfaAddC93baf78e89DCf37bA67943E1bE8F37Bb8c';
  if (!WALLET_PRIVATE_KEY)
    throw Error(`missing privateKey in WALLET_PRIVATE_KEY`);

  const iexec = getIExec(WALLET_PRIVATE_KEY);

  const dataprotectorSharing =
    DATAPROTECTOR_SHARING_ADDRESS ||
    getEnvironment(ENV as KnownEnv).dataprotectorSharingContractAddress;

  console.log(
    `creating AddOnlyAppWhitelist for DataprotectorSharing ${dataprotectorSharing}`
  );

  const addOnlyAppWhitelistAddress = await createAddOnlyAppWhitelist(
    iexec,
    dataprotectorSharing
  );

  await saveToFile(APP_WHITELIST_ADDRESS_FILE, addOnlyAppWhitelistAddress);
};

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
