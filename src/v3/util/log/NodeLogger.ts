import { BaseLogger, levelOf, Levels } from "./ILogger";

let colors: any;

export class NodeLogger extends BaseLogger {

  constructor(level: string) {
    /*IFDEBUG*/
    colors = require("colors");
    /*FIDEBUG*/

    colors.setTheme({
      trace: "grey",
      debug: "cyan",
      info: "green",
      warn: "yellow",
      error: "red"
    });
    super(levelOf(level));
  }

  private wrapParams(linesParams: boolean, callback: any, ...params: any[]) {
    let arr = [];
    for (let i = 0; i < params.length; i++) {
      if (i + 1 < params.length && i % 2 == 0) {
        arr.push(`${linesParams ? "\n\t" : ""}${callback(params[i])}=${params[i + 1]}`);
        i++;
      } else {
        arr.push(params[i]);
      }
    }
    return arr;
  }

  public print(level: Levels, linesParams: boolean, message?: any, ...params: any[]): void {
    if (!message) {
      console.log();
      return;
    }
    switch (level) {
      case Levels.TRACE:
        console.log(this.time(), colors.trace("TRACE"), message, ...this.wrapParams(linesParams, colors.trace, ...params));
        break;
      case Levels.DEBUG:
        console.log(this.time(), colors.debug("DEBUG"), message, ...this.wrapParams(linesParams, colors.debug, ...params));
        break;
      case Levels.INFO:
        console.log(this.time(), colors.info("INFO "), message, ...this.wrapParams(linesParams, colors.info, ...params));
        break;
      case Levels.WARN:
        console.log(this.time(), colors.warn("WARN "), message, ...this.wrapParams(linesParams, colors.warn, ...params));
        break;
      case Levels.ERROR:
        console.log(this.time(), colors.error("ERROR"), message, ...this.wrapParams(linesParams, colors.error, ...params));
        break;
      default:
        return;
    }
  }
}
