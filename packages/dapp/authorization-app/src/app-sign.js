import { ethers } from "ethers";


const CONSUMER_PRIVATE_KEY = "eb5aa11acbcd38b4b93941d03b3d6445747082aa127aa661b0debc784be31ff5";

const PROTECTED_DATA = "0x8b5543ac7179dec59e77dc7d52b8a1fa4e6e1621";


async function checkChallenge(signature) {
  const recoveredAddress = ethers.utils.verifyMessage(PROTECTED_DATA, signature);

  console.log("Recovered Address:", recoveredAddress);
}

async function signChallenge() {
  const wallet = new ethers.Wallet(CONSUMER_PRIVATE_KEY);
  const signature = await wallet.signMessage(PROTECTED_DATA);
  return signature;
}



(async () => {
  try {
    const signature = await signChallenge();
    console.log(signature);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
