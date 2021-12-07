import { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import config from "./config";
import ERC20Transfer from "./components/ERC20Transfer";

function App() {
  const [address, setAddress] = useState("");
  const [bitBalance, setBitBalance] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.error("No ethereum found");
      return;
    } else {
      console.log("ethereum found");
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      setAddress(accounts[0]);
      console.log("accounts found");
    } else {
      console.error("No accounts found");
    }
  };

  const connectToWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.error("No ethereum found");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setAddress(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBalance = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.error("No ethereum found");
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const bitTokenContract = new ethers.Contract(
        "0xb301916D060E6F7e43c1276dA07cfB1310736A74",
        config.bitTokenABI,
        signer
      );
      let balance = await bitTokenContract.balanceOf(address);
      console.log(balance);
      setBitBalance(balance.div("1000000000000000000").toString());
      return balance;
    } catch (err) {
      console.error("Error Arived", err);
    }
  };

  const transferTokens = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.error("No ethereum found");
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const bitTokenContract = new ethers.Contract(
        "0xb301916D060E6F7e43c1276dA07cfB1310736A74",
        config.bitTokenABI,
        signer
      );
      let amountToSend = BigNumber.from(amount).mul("1000000000000000000");
      let txs = await bitTokenContract.transfer(
        recipient,
        amountToSend.toString()
      );
      await txs.wait();
      console.log(
        `Mined, see transaction: https://rinkeby.etherscan.io/tx/${txs.hash}`
      );
    } catch (err) {
      console.error("Error Arived", err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div className="ShowCase">
        <div className="header">
          <h1>BitWrite</h1>
        </div>

        <ERC20Transfer
          amount={amount}
          setAmount={setAmount}
          recipient={recipient}
          setRecipient={setRecipient}
          transfer={transferTokens}
        />
      </div>
      <div className="Writer">
        <div className="header">
          <button onClick={connectToWallet} className="btn">
            🙋‍♂️
            {address
              ? address.slice(0, 4) +
                "..." +
                address.slice(address.length - 4, address.length)
              : "Connect"}
          </button>
          <div className="flex items-center space-x-2">
            <p>{bitBalance} $BIT</p>
            <button onClick={fetchBalance}>🔄</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
