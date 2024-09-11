import { KnownEnv, getEnvironment } from '@iexec/dataprotector-environments';
import addAppToWhitelist from './singleFunction/addAppToWhitelist.js';
import { getIExec } from './utils/utils.js';

const main = async () => {

	const WALLET_PRIVATE_KEY = 'efbc2b9cde7166a88c5001909800c2a730ee900add674cb8c74b0af9d8ba5a64';
	const WHITELIST_ADDRESS = '0x78a2040b4348c3ca388aa70865c1c1c438ce907c';
	const APP_ADDRESS = '0x92b8C0C104E7C94DB382055C38E2F56Dc75eAc98';

	if (!WALLET_PRIVATE_KEY)
		throw Error(`missing privateKey in WALLET_PRIVATE_KEY`);

	const appAddress =
		APP_ADDRESS ||
		getEnvironment(ENV as KnownEnv).protectedDataDeliveryDappAddress;

	const whitelistAddress =
		WHITELIST_ADDRESS ||
		getEnvironment(ENV as KnownEnv).protectedDataDeliveryWhitelistAddress;

	const iexec = getIExec(WALLET_PRIVATE_KEY);

	console.log(
		`adding address ${appAddress} to AddOnlyAppWhitelist ${whitelistAddress}`
	);

	await addAppToWhitelist(iexec, whitelistAddress, appAddress);
};

main().catch((e) => {
	console.log(e);
	process.exit(1);
});
