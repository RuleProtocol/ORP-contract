import { BaseLogger, levelOf, Levels } from "./ILogger";

export class ExploreLogger extends BaseLogger {

  constructor(level: string) {
    super(levelOf(level));
  }

  private wrapParams(linesParams: boolean, color: string, ...params: any[]) {
    let arr = [];
    arr.push("");
    for (let i = 0; i < params.length; i++) {
      if (i + 1 < params.length && i % 2 == 0) {
        arr[0] = `${arr[0]}${linesParams ? "\n\t" : " "}%c${params[i]}%c=${params[i + 1]}`;
        arr.push(color);
        i++;
      } else {
        arr[0] = `${arr[0]} %c${params[i]}`;
      }
      arr.push("");
    }
    return arr;
  }

  public print(level: Levels, linesParams: boolean, message?: any, ...params: any[]): void {
    if (!message) {
      console.log();
      return;
    }
    let color: string;
    let levelString: string;
    switch (level) {
      case Levels.TRACE:
        color = "color:grey";
        levelString = "TRACE";
        break;
      case Levels.DEBUG:
        color = "color:cyan";
        levelString = "DEBUG";
        break;
      case Levels.INFO:
        color = "color:green";
        levelString = "INFO";
        break;
      case Levels.WARN:
        color = "color:yellow";
        levelString = "WARN";
        break;
      case Levels.ERROR:
        color = "color:red";
        levelString = "ERROR";
        break;
      default:
        return;
    }
    let wrappedParams = this.wrapParams(linesParams, color, ...params);
    console.log(`${this.time()} %c${levelString} %c${message}` + wrappedParams[0], color, "", ...wrappedParams.slice(1));
  }
}
