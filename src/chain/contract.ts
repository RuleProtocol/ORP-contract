// @ts-nocheck
import { ethers } from "hardhat";
import { Contract as EthersContract, Signer } from "ethers";
import { saveDeployment } from "../../task/deploy";
import networkConfig from "../../networks";
import { getLogger, ILogger } from "../v3";
import { ProxyIntake } from "../../typechain";
import { Interface } from "@ethersproject/abi";

let logger: ILogger = getLogger();

export function getInitializerData(
  contractInterface: Interface,
  args: unknown[],
  initializer?: string | false
): string {
  if (initializer === false) {
    return "0x";
  }

  const allowNoInitialization = initializer === undefined && args.length === 0;
  initializer = initializer ?? "initialize";

  try {
    const fragment = contractInterface.getFunction(initializer);
    return contractInterface.encodeFunctionData(fragment, args);
  } catch (e: unknown) {
    if (e instanceof Error) {
      if (allowNoInitialization && e.message.includes("no matching function")) {
        return "0x";
      }
    }
    throw e;
  }
}

export class Contract {

  // {
  // libraries: {
  //   "contracts/chaosverse/V1/abstract/ContractAddrCalculator.sol:ContractAddrCalculator": contractAddrCalculator.address,
  // },
  public static async deployWithLib(contractName: string, libraries: {}, signer: Signer, args: any[], log?: {
    saveName: string,
    folder: string,
    override: boolean
  }) {
    if (log.override != undefined && !log.override) {
      let con = await this.getByDeployment(await signer.getChainId(), contractName, signer, log);
      if (con != null) {
        return con;
      }
    }

    const contractAbi = await ethers.getContractFactory(contractName, { libraries, signer: signer });
    const contract = await contractAbi.deploy(...args);

    await contract.deployed();

    if (log) {
      let receipt = await signer.provider?.getTransactionReceipt(contract.deployTransaction.hash);

      let signerAddress = await signer.getAddress();
      logger.info("contract-deploy",
        "contract", contract.address,
        "name", `${contractName}${log.saveName ? `-${log.saveName}` : ""}`,
        "signer", signerAddress,
        "nonce", contract.deployTransaction.nonce,
        "status", receipt.status,
        "block", contract.deployTransaction.blockNumber,
        "gasPrice", contract.deployTransaction.gasPrice == undefined ? "0" : contract.deployTransaction.gasPrice.toString(),
        "gasLimit", contract.deployTransaction.gasLimit.toString(),
        "hash:", contract.deployTransaction.hash);

      let providerUrl = networkConfig.networks[networkConfig.defaultNetwork].url;
      let nw = await contract.provider.getNetwork();
      await saveDeployment(log.saveName, log.folder, networkConfig.defaultNetwork, nw.chainId, providerUrl, contractName, contract.address, args, libraries, signerAddress,
        contract.deployTransaction.hash, contract.deployTransaction.nonce, contract.deployTransaction.blockNumber, receipt.status, contract.interface.format());
    }
    return contract;
  }

  /**
   * @param contractName
   * @param signer
   * @param args
   * @param log name: print, saveName:exist , save deployment info to file, folder: will create folder in deployment
   */
  public static async deploy(contractName: string, signer: Signer, args: any[], log?: {
    saveName: string,
    folder: string,
    override: boolean
  }) {
    return await Contract.deployWithLib(contractName, {}, signer, args, log);
  }

  public static async deployProxyWithLib(contractName: string, libraries: {}, signer: Signer, args: any[], log?: {
    saveName: string,
    folder: string,
    override: boolean
  }, proxyAdmin: string, impl: EthersContract, initializer: string | boolean): EthersContract {
    if (!impl) {
      impl = await Contract.deployWithLib(contractName, libraries, signer, args.slice(-1), log);
    }
    const data = getInitializerData(impl.interface, args.slice(0, -1), initializer);

    log.saveName = log.saveName ? `${contractName}-${log.saveName}` : contractName;
    let proxy = <ProxyIntake>await Contract.deploy("ProxyIntake", signer, [impl.address, proxyAdmin ?? await signer.getAddress(), data, ...args.slice(-1)], log);
    // TODO optimize
    return new EthersContract(proxy.address, impl.interface, signer);
  }

  public static async deployProxy(contractName: string, signer: Signer, args: any[], log?: {
    saveName: string,
    folder: string,
    override: boolean
  }, proxyAdmin: string, impl: EthersContract, initializer: string | boolean): EthersContract {
    return Contract.deployProxyWithLib(contractName, {}, signer, args, log, proxyAdmin, impl, initializer);
  }

  public static async get(contractName: string, contractAddress: string, signer: Signer, log?: { name: string }) {
    const contract = await ethers.getContractAt(contractName, contractAddress, signer);
    if (log) {
      logger.info("contract-get", "logName", log.name, "contractName", contractName, "contractAddress", contract.address, "signer", await signer.getAddress());
    }
    return contract;
  }

  public static async getByDeployment(chainId: string, contractName: string, signer: Signer, log?: { folder: string, saveName: string }, proxy: boolean = false) {
    let deployment = await Contract.getDeployment(chainId, contractName, signer, log, proxy);
    if (deployment == null) {
      return null;
    }

    return await ethers.getContractAt(contractName, deployment.contractAddress, signer);
  }

  public static async getDeployment(chainId: string, contractName: string, signer: Signer, log?: { name: string, folder: string, saveName: string }, proxy: boolean = false) {
    let path = `../../deployments/${chainId}/`;
    if (log.folder) {
      path += `${log.folder}/`;
    }

    let saveName = "";
    if (proxy) {
      saveName += "ProxyIntake-";
    }
    saveName += contractName;
    if (log.saveName) {
      saveName += `-${log.saveName}`;
    }
    path += `${saveName}.json`;

    let deployment = null;
    try {
      deployment = require(path);
      if (log) {
        logger.info("contract-getByDeployment", "contractAddress", deployment.contractAddress, "name", saveName, "signer", await signer.getAddress());
      }
    } catch (e) {
      logger.error("contract-getByDeployment-not exist", "contractName", contractName, "path", path);
      return null;
    }

    return deployment;
  }
}

