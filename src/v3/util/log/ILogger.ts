export enum Levels {TRACE, DEBUG, INFO, WARN, ERROR, NONE}

export function levelOf(_level: string): Levels {
  switch (_level) {
    case "TRACE":
      return Levels.TRACE;
    case "DEBUG":
      return Levels.DEBUG;
    case "INFO":
      return Levels.INFO;
    case "WARN":
      return Levels.WARN;
    case "ERROR":
      return Levels.ERROR;
    case "NONE":
      return Levels.NONE;
  }
  return Levels.NONE;
}

export interface ILogger {
  trace(message?: any, ...params: any[]): void;
  debug(message?: any, ...params: any[]): void;
  info(message?: any, ...params: any[]): void;
  warn(message?: any, ...params: any[]): void;
  error(message?: any, ...params: any[]): void;
  traceln(message?: any, ...params: any[]): void;
  debugln(message?: any, ...params: any[]): void;
  infoln(message?: any, ...params: any[]): void;
  warnln(message?: any, ...params: any[]): void;
  errorln(message?: any, ...params: any[]): void;
}

export abstract class BaseLogger implements ILogger {
  public level: Levels = Levels.TRACE;

  constructor(level: Levels) {
    this.level = level;
  }

  protected time(): string {
    return new Date(new Date().setHours(new Date().getHours() + 8)).toISOString().replace("Z", " ").replace("T", " ").slice(5, -1);
  }

  public trace(message?: any, ...params: any[]): void {
    Levels.TRACE >= this.level && this.print(Levels.TRACE, false, message, ...params);
  }

  public debug(message?: any, ...params: any[]): void {
    Levels.DEBUG >= this.level && this.print(Levels.DEBUG, false, message, ...params);
  }

  public info(message?: any, ...params: any[]): void {
    Levels.INFO >= this.level && this.print(Levels.INFO, false, message, ...params);
  }

  public warn(message?: any, ...params: any[]): void {
    Levels.WARN >= this.level && this.print(Levels.WARN, false, message, ...params);
  }

  public error(message?: any, ...params: any[]): void {
    Levels.ERROR >= this.level && this.print(Levels.ERROR, false, message, ...params);
  }

  public traceln(message?: any, ...params: any[]): void {
    Levels.TRACE >= this.level && this.print(Levels.TRACE, true, message, ...params);
  }

  public debugln(message?: any, ...params: any[]): void {
    Levels.DEBUG >= this.level && this.print(Levels.DEBUG, true, message, ...params);
  }

  public infoln(message?: any, ...params: any[]): void {
    Levels.INFO >= this.level && this.print(Levels.INFO, true, message, ...params);
  }

  public warnln(message?: any, ...params: any[]): void {
    Levels.WARN >= this.level && this.print(Levels.WARN, true, message, ...params);
  }

  public errorln(message?: any, ...params: any[]): void {
    Levels.ERROR >= this.level && this.print(Levels.ERROR, true, message, ...params);
  }

  abstract print(level: Levels, linesParams: boolean, message?: any, ...params: any[]): void;
}

