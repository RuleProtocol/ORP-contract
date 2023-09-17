// @ts-nocheck
import * as fs from "fs";
import {mkdirSync, writeFileSync} from "fs";

export async function saveDeployment(
  name: string,
  folder: string,
  network: string,
  chainId: number,
  providerUrl: string,
  contractName: string,
  contractAddress: string,
  args: Array<any> = [],
  libraries: Object = {},
  signerAddress: string,
  deployHash: string,
  deployNonce: string,
  deployHeight: any,
  status: number,
  functions: string,
) {
  //some contract are in full path
  if (contractName.indexOf(":") >= 0) {
    contractName = contractName.split(":")[1];
  }

  let nowStr = getNowDate();

  let rootPath = __dirname + "/..";
  let path = rootPath + `/deployments/${chainId}/`;
  if (folder != undefined) {
    if (folder == "") {
      path += nowStr + "/";
    } else {
      path += folder + "/";
    }
  }

  let file = `${contractName}.json`;
  if (name != undefined && name != "") {
    file = `${contractName}-${name}.json`;
  }

  mkdirSync(path, {recursive: true});

  //confirm abi json
  let srcDir = rootPath + '/artifacts/contracts';
  let allSrcFiles = [];
  getAllFiles(srcDir, allSrcFiles)
  let abiJson = "";
  allSrcFiles.forEach(filePath => {
    let filename = filePath.substring(filePath.lastIndexOf("/") + 1);
    let fileFolder = filePath.substring(0, filePath.lastIndexOf("/"));

    if (filename == contractName + ".json") {
      abiJson = require(filePath);
    }
  });


  let baseJson = {
    network: network,
    chainId: chainId,
    providerUrl: providerUrl,
    contractName: contractName,
    contractAddress: contractAddress,
    args: args,
    libraries: libraries,
    signerAddress: signerAddress,
    deployHash: deployHash,
    deployNonce: deployNonce,
    deployHeight: deployHeight,
    deployTime: nowStr,
    status: status,
    functions: functions,
  };

  const allObj = {
    ...baseJson,
    ...abiJson
  };

  writeFileSync(
    path + file,
    JSON.stringify(allObj, null, '\t')
  );

}

function getNowDate(): string {
  const date = new Date();
  let month: string | number = date.getMonth() + 1;
  let strDate: string | number = date.getDate();

  if (month <= 9) {
    month = "0" + month;
  }

  if (strDate <= 9) {
    strDate = "0" + strDate;
  }

  let strMin = "";
  if (date.getMinutes() > 9) {
    strMin = date.getMinutes();
  } else {
    strMin = "0" + date.getMinutes();
  }

  let strSecond = "";
  if (date.getSeconds() > 9) {
    strSecond = date.getSeconds();
  } else {
    strSecond = "0" + date.getSeconds();
  }

  return date.getFullYear() + "-" + month + "-" + strDate + " "
    + date.getHours() + "." + strMin + "." + strSecond;
}

function getAllFiles(path: string, files: []) {
  fs.readdirSync(path).forEach(function (file) {
    var subpath = path + '/' + file;
    if (fs.lstatSync(subpath).isDirectory()) {
      getAllFiles(subpath, files);
    } else {
      files.push(path + '/' + file);
    }
  });
  return files;
}
