//@ts-nocheck


import { encode } from "rlp";

let rlp = require("rlp");

export class RLP {

  public static to(name:string,value:any){

    let typeValue = typeof value;

    let type;// = typeof value === 'number' ? 'number/boolean' : Array.isArray(value) ? 'array' : 'string';

    if(typeValue === 'number'){
      type = 'number/boolean';
    }
    else if(Array.isArray(value)){
      type = 'array';
    }
    else if(typeValue == 'object') {
      if (value._isBigNumber && value._isBigNumber == true) {
        type = 'bigNumber';
      }
    }
    else {
      type = "string";
    }

    if(type == 'number/boolean'){
      return [name,"uint",value];
    }
    else if(type == "string") {
      if(value.startsWith("0x") && value.length == 42){
        return [name,"address",value];
      }
      return [name,"string",value];
    }
    else if(type == "array"){
      return [name,"list",value];
    }
    else if(type == "bigNumber"){
      return [name,"uint",value.toHexString()];
    }

  }
  //[ ["trialOut","uint",3], ["user","string","bob"]
  public static fromList(args:string):[]{
    let decodeArgsList = rlp.decode(args);
    let resList = [];
    for(let i = 0; i < decodeArgsList.length; ++i){

      let args = decodeArgsList[i];

      let hname = args[0].toString();
      let type = args[1].toString();
      let value;
      if(type == "uint"){
        let hexv = args[2].toString('hex');
        if(hexv == ""){
          hexv = "0x0";
        }
        value = parseInt(hexv, 16);
      }
      else if(type == "string"){
        value = args[2].toString();
      }
      else if(type == "address"){
        value = "0x" + args[2].toString();
      }
      else if(type == "bool"){
        value =  Boolean(parseInt(args[2].toString('hex'), 16));
      }

      resList.push([hname,type,value]);
    }

    return resList;
  }


}
