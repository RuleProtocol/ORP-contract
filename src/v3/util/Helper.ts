// @ts-nocheck
import { BigNumberish } from "ethers";

let rlp = require("rlp");

export class Helper {

  public static toHex(buf: any) {
    buf = buf.toString("hex");
    if (buf.substring(0, 2) == "0x")
      return buf;
    return "0x" + buf.toString("hex");
  };

  public static rlpEncode(buf: any) {
    return Helper.toHex(rlp.encode(buf));
  };

  public static rlpDecode(hex: any) {
    return rlp.decode(hex);
  };

  public static rlp(cmd: any) {
    if (cmd instanceof Array) {
      return Helper.toHex(rlp.encode(cmd));
    } else {
      return Helper.toHex(rlp.encode(cmd.toString()));
    }
  };

  public static printTx = function(name: string, tx: object, estimateGas: BigNumberish) {
    let bnbCoin = tx.gasUsed * 5 * 1000000000 / 1000000000000000000.0;
    let usdt = bnbCoin * 300;

  };
}
