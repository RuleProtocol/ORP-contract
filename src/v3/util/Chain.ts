// @ts-nocheck
import {ethers, Signer, utils} from "ethers"

const logPreFix = "----CHAIN----";
const logPreFix2 = "         ----";

function sendTx(toAddress: string | Signer, etherValue: number)

export class Chain {
  signers: Signer[] = new Array<Signer>();
  jsonProvider: ethers.providers.JsonRpcProvider;

  constructor(url?: any, wallets?: any[] = []) {
    if (url != undefined && url != "") {
      this.jsonProvider = new ethers.providers.JsonRpcProvider(url);
    }
    if (wallets.length == 0) {
      return;
    }

    if (!(typeof wallets[0] == 'string') && typeof (wallets[0].signTransaction) === "function") {
      this.signers = wallets;
    } else {
      this.signers = new Array<Signer>();
      for (let i = 0; i < wallets.length; ++i) {
        let key = wallets[i];
        const wallet = new ethers.Wallet(key, this.jsonProvider)
        this.signers.push(wallet);
      }
    }
  }

  public async inject(windowEther) {
    if (windowEther != undefined) {
      this.jsonProvider = new ethers.providers.Web3Provider(windowEther)
      await this.jsonProvider.send("eth_requestAccounts", [])
      const signer = this.jsonProvider.getSigner();
      this.signers.push(signer);
      console.log('--inject--address:', await signer.getAddress());
      return;
    }
  }

  public keyToSigner(key: string): ethers.Wallet {
    return new ethers.Wallet(key, this.jsonProvider);
  }

  public getAddress(signerOrKey: string | Signer) {
    let address = "";
    if (!(typeof signerOrKey == 'string') && typeof (signerOrKey.signTransaction) === "function") {
      address = signerOrKey.getAddress();
    } else if (typeof signerOrKey == 'string') {
      const wallet = new ethers.Wallet(signerOrKey);
      address = wallet.address.toLowerCase();
    }
    return address;
  }

  public static convertAddress(signerOrAddress: string | Signer) {
    let address = "";
    if (!(typeof signerOrAddress == 'string') && typeof (signerOrAddress.signTransaction) === "function") {
      address = signerOrAddress.getAddress();
    } else {
      address = signerOrAddress;
    }
    return address;
  }

  public getSigner(index: number): Signer | undefined {
    return this.signers[index]
  }

  public async getSignerByAddress(address: string): Signer {
    if (!address) {
      return this.signers[0]
    }
    for (let signer of this.signers) {
      let sigAddress = await signer.getAddress();
      if (sigAddress.toLowerCase() === address.toLowerCase()) {
        return signer;
      }
    }
    return this.signers[0]
  }

  public async balance(signer: String | Signer, log?: {}) {
    let strAddress = "";
    let jsonProvider = this.jsonProvider;
    if (typeof signer !== 'string' && typeof (signer.signTransaction) === "function") {
      jsonProvider = signer.provider;
      strAddress = signer.getAddress();
    } else {
      strAddress = signer.toString();
    }
    let balance = await jsonProvider.getBalance(strAddress);
    if (log) {
      console.log(logPreFix, "balance", strAddress, ethers.utils.formatEther(balance.toString()));
    }
    return balance;
  }

  public async sendTx0(toAddress: string | Signer, etherValue: number, log?: { name: string }) {
    let fromSigner = this.signers[0];
    let fromAddress = await fromSigner.getAddress();
    return await this.sendTx(fromAddress, toAddress, etherValue, log);
  }

  public async sendTx(fromAddress: string | Signer, toAddress: string | Signer, etherValue: number, log?: {
    name: string
  }) {
    let fromSigner: Signer;
    let toAddressStr: string;

    let jsonProvider = this.jsonProvider;
    if (fromAddress && typeof fromAddress == 'object') {
      jsonProvider = fromAddress.provider
    }

    let gasPrice = await jsonProvider.getGasPrice();
    let gasLimit = 210000;

    if (typeof fromAddress == 'string') {
      for (let sig of this.signers) {
        let sigAddress = await sig.getAddress();
        if (sigAddress.toLowerCase() === fromAddress.toLowerCase()) {
          fromSigner = sig;
          break;
        }
      }
    } else {
      fromSigner = <Signer>fromAddress;
    }

    if (!(typeof toAddress == 'string') && typeof (toAddress.signTransaction) === "function") {
      toAddressStr = toAddress.getAddress();
    } else {
      toAddressStr = toAddress;
    }

    const fromBalanceBegin = await this.balance(fromAddress);
    const toBalanceBegin = await this.balance(toAddress);

    let tx = await fromSigner.sendTransaction({
      gasLimit: gasLimit,
      gasPrice: gasPrice,
      to: toAddressStr,
      value: ethers.utils.parseEther(etherValue.toString())
    });

    await tx.wait();

    const fromBalanceEnd = await this.balance(fromAddress);
    const toBalanceEnd = await this.balance(toAddress);

    if (log) {
      console.log(logPreFix, log.name,
        "from", await fromSigner.getAddress(), "(" + ethers.utils.formatEther(fromBalanceBegin.toString()) + " -> " + ethers.utils.formatEther(fromBalanceEnd.toString()) + ")");
      console.log(logPreFix2,  log.name,
        "to", toAddressStr, "(" + ethers.utils.formatEther(toBalanceBegin.toString()) + " -> " + ethers.utils.formatEther(toBalanceEnd.toString()) + ")");
      console.log(logPreFix2,  "value", etherValue.toString());
    }

    return tx;
  }

  // let nonceList = await smoothNonce("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  //     await addr1.getAddress(),["http://127.0.0.1:8546","http://127.0.0.1:8545"],true);
  public async smoothNonce(key: string | Signer, toAddr: string, urlList: [], transfer: boolean = false, log?: {
    name: string
  }) {
    if (typeof key != "string") {
      console.log("---- key is not string");
      return;
    }

    let hasDiff = false;
    let maxNonce = 0;
    let mapNonce: Map = new Map<number, string>();
    for (let i = 0; i < urlList.length; ++i) {
      let url = urlList[i];
      let chain = new Chain(url);
      let signer = chain.keyToSigner(key);
      let address = await signer.getAddress();

      if (log) {
        await chain.balance(address, {name: "owner"});
      }

      let nonce = await chain.jsonProvider.getTransactionCount(address);
      if (nonce > maxNonce) {
        maxNonce = nonce;
      }

      mapNonce.set(nonce, "")
    }

    if (mapNonce.size > 1) {
      hasDiff = true;
    }

    let nonceList = [];
    if (hasDiff) {
      for (let i = 0; i < urlList.length; ++i) {
        let url = urlList[i];
        let chain = new Chain(url);
        let signer = chain.keyToSigner(key);
        let address = await signer.getAddress();

        let nonce = await chain.jsonProvider.getTransactionCount(address);
        let diffNonce = maxNonce - nonce;
        if (diffNonce > 0 && transfer) {
          for (let i = 0; i < diffNonce; ++i) {
            let tx;
            if (log) {
              tx = await chain.sendTx(signer, toAddr, 0.000001, {name: log.name + " " + i + "/" + (diffNonce - 1)});
            } else {
              tx = await chain.sendTx(signer, toAddr, 0.000001);
            }
          }
        }

        let obj = {
          url: url,
          diff: diffNonce,
          nonce: nonce,
          maxNonce: maxNonce
        }
        nonceList.push(obj);

        if (log) {
          console.log("-----", url, "diffNonce", diffNonce, "nonce", nonce, "maxNonce", maxNonce);
        }
      }
    }

    if (log && !hasDiff) {
      console.log("----- nonce on all chains are the same", mapNonce.keys().next().value);
    }

    return [hasDiff, nonceList];
  }

  public async signMessage(address: string | Signer, message: string, log?: { name: string }) {
    const signer = await this.getSignerByAddress(address);
    const result = await signer.signMessage(message)
    if (log) {
      console.log(`signMessage, address: ${await signer.getAddress()}, message: ${message}`);
    }
    return result;
  }

  public async getLatestBlock(user?: Signer) {
    const jsonProvider = user ? user.provider : this.jsonProvider;
    const blockLatestNum = await jsonProvider.getBlockNumber();
    return await jsonProvider.getBlock(blockLatestNum);
  }

  public async getLatestBlockHeight(user?: Signer) {
    const jsonProvider = user ? user.provider : this.jsonProvider;
    return await jsonProvider.getBlockNumber();
  }

  public async getLatestBlockTimestamp(user?: Signer) {
    const jsonProvider = user ? user.provider : this.jsonProvider;
    const blockLatestNum = await jsonProvider.getBlockNumber();
    const block = await jsonProvider.getBlock(blockLatestNum);
    return block.timestamp;
  }



  public async decodeEvent(contract: ethers.Contract, receipt: ethers.ContractReceipt, eventName: string) {
    let event = contract.interface.getEvent(eventName)
    let eventStr = event.format();
    let encodeEvent = utils.keccak256(utils.toUtf8Bytes(eventStr));

    let eventLogList: [] = [];
    for (var i = 0; i < receipt.logs.length; ++i) {
      var log = receipt.logs[i];

      var topic = log.topics[0];
      if (topic == encodeEvent) {
        let eventLog = contract.interface.decodeEventLog(event, log.data, log.topics)
        eventLogList.push({contract: log.address, eventLog: eventLog});
      }
    }

    return eventLogList;
  }

}
