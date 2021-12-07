import { ethers } from "ethers";
import config from "../config";

function fetchBalance(address) {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.error("No ethereum found");
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const bitTokenContract = new ethers.Contract(
      config.bitTokenAddress,
      config.bitTokenABI,
      signer
    );
    let balance = await bitTokenContract.balanceOf(address);
    console.log(balance);
    return balance;
  } catch (err) {
    console.error("Error Arived", err);
  }
}
