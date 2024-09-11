import path from 'path';
import { promises as fsPromises } from "fs";
import fs from "fs";
import http from 'http';
import url from 'url';
import mimetypes from 'mime-types';
import axios from 'axios';
import { ethers } from "ethers";
import contractABI from './DataProtectorSharing.json' assert { type: 'json' };

const dataset = process.env.IEXEC_DATASET_ADDRESS;
const iexec_in = process.env.IEXEC_IN;
const dataset_filename = process.env.IEXEC_DATASET_FILENAME;
const image_path = path.join(iexec_in, dataset_filename);


const PRIVATE_KEY = "0x08ce11e96e89526ff532b14ad050b9dcd41fd3bcedb0caf2d147d18e38a080c5";
const iexecOut = process.env.IEXEC_OUT;

// Connect to the blockchain
const provider = new ethers.providers.JsonRpcProvider("http://20.185.225.192:8545");

const contractAddress = '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1'; // Replace with your smart contract address

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function getPublicIp() {
	try {
		const response = await axios.get("https://httpbin.org/ip");
		const data = response.data;
		const publicIp = data.origin;
		return publicIp;
	} catch (error) {
		console.error("Error:", error);
		return null;
	}
}

async function addHostToKVS() {

	const address = dataset.toLowerCase();

	const now = Math.floor(Date.now() / 1000);
	const ip = await getPublicIp();
	const port = 6060;
	const host = {
		timestamp: now,
		ip: ip,
		port: port
	};

	try {
		// Send a POST request to the KVS server
		const response = await fetch('http://20.185.225.192:4000/kvs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ address, host }),
		});
		
		// Check if the response is OK (status code 200-299)
		if (response.ok) {
			const result = await response.json();
			console.log('Host added successfully:', result.message);
		} else {
			// Handle non-200 responses
			const error = await response.json();
			console.error('Error adding host:', error.error);
		}
	} catch (error) {
		// Handle network or other errors
		console.error('Network error:', error);
	}
}
/*
async function kafkaProducer() {
	const kafka = new Kafka({
		brokers: ['20.185.225.192:9092']
	});
	console.log('Kafka Producer has been initiated...');
	const producer = kafka.producer();

	await producer.connect();

	const now = Math.floor(Date.now() / 1000);
	const ip = await getPublicIp();
	const port = 6060;
	const data = {
		time: now,
		ip: ip,
		port: port
	};
	const message = JSON.stringify(data);
	await producer.send({
		topic: dataset.toLowerCase(),
		messages: [{ value: message }]
	});
	await producer.disconnect();
	console.log(message);
}
*/

class MyHandler extends http.ServerResponse {

	async doGET(req, res) {

		// Parse the URL to extract query parameters
		const parsedUrl = url.parse(req.url, true);
		const query = parsedUrl.query;

		// Check if required parameters are present
		if (!query.consumer || !query.protectedData || !query.signature) {
			res.writeHead(400, { 'Content-Type': 'text/plain' });
			res.end('Missing required parameters');
			return;
		}

		// Access query parameters
		const consumer = query.consumer;
		const protectedData = query.protectedData;
		const signature = query.signature;

		const isAllowed = await this.isConsumerAllowed(consumer, protectedData, signature);

		if (!isAllowed) {
			res.writeHead(403, { 'Content-Type': 'text/plain' });
			res.end('Forbidden');
			return;
		}

		// Send response status code
		// Determine the MIME type of the image based on its file extension
		const mimeType = mimetypes.lookup(image_path);

		this.writeHead(200, {
			'Content-type': mimeType,
			'Content-Disposition': `attachment; filename="${image_path}"`
		});

		// Open and read the image file
		const image_data = fs.readFileSync(image_path);

		// Send the image data as the response
		res.end(image_data);
	}

	async getEvents(consumer, protectedData) {
		const filter = contract.filters.ProtectedDataConsumed(consumer, protectedData); // Adjust as needed
		const fromBlock = 27988599; // Start block number
		const toBlock = 'latest';   // End block number (or specific block number)

		try {
			const events = await contract.queryFilter(filter, fromBlock, toBlock);
			return events;
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	async isConsumerEventOnBlockchain(consumer, protectedData) {
		const events = await this.getEvents(consumer, protectedData);

		return events.length > 0;
	}

	checkChallenge(consumer, protectedData, signature) {
		const recoveredAddress = ethers.utils.verifyMessage(protectedData, signature);

		return recoveredAddress.toLowerCase() === consumer.toLowerCase();
	}

	async isConsumerAllowed(consumer, protectedData, signature) {
		const isAllowed = await this.isConsumerEventOnBlockchain(consumer, protectedData);
		const isChallengePassed = this.checkChallenge(consumer, protectedData, signature);
		return isAllowed && isChallengePassed;
	}
}

function run(port = 6060) {
	const server = http.createServer((req, res) => {
		const myHandler = new MyHandler(req, res);
		myHandler.doGET(req, res);
	});

	server.listen(port, () => {
		console.log(`Server running at http://localhost:${port}/`);
	});
}

(async () => {
	try {

		await addHostToKVS();
		run();

		// Append some results in /iexec_out/
		await fsPromises.writeFile(`${iexecOut}/result.txt`, '');
		// Declare everything is computed
		const computedJsonObj = {
			"deterministic-output-path": `${iexecOut}/result.txt`,
		};
		await fsPromises.writeFile(
			`${iexecOut}/computed.json`,
			JSON.stringify(computedJsonObj)
		);
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
})();