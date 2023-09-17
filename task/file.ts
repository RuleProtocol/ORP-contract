// @ts-nocheck
import {mkdirSync, writeFileSync} from "fs";


export async function writeFile(chainId: number, folder: string, filename: string, content: any) {

  let rootPath = __dirname + "/..";
  let path = rootPath + `/deployments/${chainId}/`;

  if (folder != undefined) {
    if (folder != "") {
      path += folder + "/";
    }
  }

  let file = `${filename}.json`;

  mkdirSync(path, {recursive: true});

  let con = JSON.stringify(content, null, '\t');

  writeFileSync(
    path + file,
    JSON.stringify(content, null, '\t')
  );
}
