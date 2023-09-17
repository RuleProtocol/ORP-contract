import { ILogger } from "./log/ILogger";
import { ExploreLogger } from "./log/ExploreLogger";
import { NodeLogger } from "./log/NodeLogger";

export { ILogger, ExploreLogger, NodeLogger };

export let level: string = "TRACE";

export function $getLogger(nodeEnv: boolean, level: string): ILogger {
  if (nodeEnv) {
    return new NodeLogger(level);
  } else {
    return new ExploreLogger(level);
  }
}

export function getLogger(): ILogger {
  return $getLogger(typeof XMLHttpRequest === "undefined", level);
}

export function setLevel(_level: string) {
  level = _level;
}

// let main = function() {
//   // setLevel("ERROR");
//   let log: ILogger = getLogger();
//
//   log.debug();
//   log.debug("awesome", "log");
//   log.debugln("awesome", "log");
//   log.debugln("awesome log", "id", 1, "name", "chaos", "wow");
//
//   log.trace("awesome log", "id", 1, "name", "chaos");
//   log.debug("awesome log", "id", 1, "name", "chaos");
//   log.info("awesome log", "id", 1, "name", "chaos");
//   log.warn("awesome log", "id", 1, "name", "chaos");
//   log.error("awesome log", "id", 1, "name", "chaos");
//
//   log.traceln("awesome log", "id", 1, "name", "chaos");
//   log.debugln("awesome log", "id", 1, "name", "chaos");
//   log.infoln("awesome log", "id", 1, "name", "chaos");
//   log.warnln("awesome log", "id", 1, "name", "chaos");
//   log.errorln("awesome log", "id", 1, "name", "chaos");
// };

// main();

