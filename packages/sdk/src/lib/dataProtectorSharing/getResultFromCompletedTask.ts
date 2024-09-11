import { throwIfMissing } from '../../utils/validators.js';
import {
  GetResultFromCompletedTaskParams,
  GetResultFromCompletedTaskResponse,
} from '../types/index.js';
import { IExecConsumer } from '../types/internalTypes.js';

async function getMostRecentHost(datasetAddress) {
  try {
    // Fetch the hosts from the KVS server
    const response = await fetch(`http://20.185.225.192:4000/kvs/${datasetAddress}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    
    // Check if hosts are returned
    if (!data.hosts || data.hosts.length === 0) {
      console.log('No hosts found for the given dataset address.');
      return null;
    }

    // Find the most recent host by comparing timestamps
    const mostRecentHost = data.hosts.reduce((latest, host) => {
      return (!latest || new Date(host.timestamp) > new Date(latest.timestamp)) ? host : latest;
    }, null);

    console.log('Most recent host:', mostRecentHost);
    return mostRecentHost;
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

export const getResultFromCompletedTask = async ({
  iexec = throwIfMissing(),
  protectedData = throwIfMissing(),
  onStatusUpdate = () => { },
}: IExecConsumer &
  GetResultFromCompletedTaskParams): Promise<GetResultFromCompletedTaskResponse> => {
  onStatusUpdate({
    title: 'CONSUME_RESULT_DOWNLOAD',
    isDone: false,
  });
  
    const datasetAddress = protectedData.toLowerCase();
    const host = await getMostRecentHost(datasetAddress);
    console.log(host);
    
   // const array = await startConsumer(datasetAddress);
    //console.log(array);

/*
    const kafka = new Kafka({
      brokers: ['20.185.225.192:9092'],
      logLevel: logLevel.ERROR,
    })
  
    let grp = (Math.random() + 1).toString(36).substring(2);
  
    const consumer = kafka.consumer({ groupId: grp })
    await consumer.subscribe({ topics: [datasetAddress], fromBeginning: true })
  
    let array = [];
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        array.push(message.value.toString());
      },
    })
    
  
    // Step 1: Sort the array by the "time" property in descending order to get the newest entry first
    array.sort((a, b) => b.time - a.time);
    
    console.log(array);
  
  // Step 2: Get the newest entry
    const newestEntry = array[0];
    console.log(newestEntry);
    const { ip, port } = newestEntry;
    */
    
  let ip = '20.185.225.192';
  let port = '6060';
    
  // Step 3: Create the URL and fetch the resource
  const url = new URL(`http://${ip}:${port}`);
  let content;

  try {
    let userAddress = await iexec.wallet.getAddress();
    userAddress = userAddress.toLowerCase();

    const config = iexec.config;
    const contract = await config.resolveContractsClient();
    const signer = contract.signer;
    const signature = await signer.signMessage(protectedData);

    const params = { consumer: userAddress, protectedData: protectedData, signature: signature };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    console.log(url);
    const response = await fetch(url);

    // Check if the response is ok (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch resource from ${url}`);
    }

    content = await response.text();
    

  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }

  onStatusUpdate({
    title: 'CONSUME_RESULT_DOWNLOAD',
    isDone: true,
  });

  if (!content) {
    throw new Error('No "content" file found in decrypted zip');
  }

  // Convert SVG text to ArrayBuffer
  const encoder = new TextEncoder();
  const contentAsBuffer = encoder.encode(content).buffer;

  // Create Blob and Object URL
  const blob = new Blob([contentAsBuffer], { type: 'image/svg+xml' });
  const contentAsObjectURL = URL.createObjectURL(blob);

  //const contentAsBuffer = await content.async('arraybuffer');

  //const contentAsObjectURL = URL.createObjectURL(new Blob([contentAsBuffer]));

  return {
    contentAsObjectURL,
  };
};
