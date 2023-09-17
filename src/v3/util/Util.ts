// @ts-nocheck
import {BigNumber, ethers, utils} from "ethers";

export class Util {

  //expand 18 0
  public static E18(n: any): BigNumber {
    return utils.parseEther(n.toString());
  }

  public static expandTo18Decimals(n: number): BigNumber {
    return utils.parseEther(n.toString());
  }

  public static BN(n: any): BigNumber {
    if (typeof n == 'object') {
      return n;
    } else {
      return BigNumber.from(n);
    }
  }

  //delete 18 0
  public static D18(n: BigNumber): Number {
    return Number(utils.formatEther(n));
  }

  public static ZeroAddress(): string {
    return utils.formatBytes32String("").substring(0, 42);
  }

  public static OneAddress(): string {
    return "0x0000000000000000000000000000000000000001";
  }

  public static ZeroBytes32String(): string {
    return utils.formatBytes32String("");
  }

  public static getFunctionCallData(abiFunc: string, args: []) {
    let abiNew = []
    abiNew.push(abiFunc);
    let iface = new ethers.utils.Interface(abiNew);
    let functionName = Util.getFunctionName(abiFunc)
    console.log(functionName)
    let data = iface.encodeFunctionData(functionName, args);
    return data;
  }

  private static getFunctionName(abi: string) {
    let startIndex = abi.indexOf("function");
    let endIndex = abi.indexOf("(");
    let res = abi.substring(startIndex + 8, endIndex).trim();
    return res;
  }
}

