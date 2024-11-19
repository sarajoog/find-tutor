import { Injectable, isDevMode } from '@angular/core';
import { ILogger, LogLevel } from '../interfaces/logger.interface';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILogger {
  private level: LogLevel = isDevMode() ? LogLevel.DEBUG : LogLevel.ERROR;

  constructor() {}

  private formatMessage(message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] ${message} ${args.length ? JSON.stringify(args) : ''}`;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level && this.level !== LogLevel.OFF;
  }

  setLogLevel(level: LogLevel): void {
    this.level = level;
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage(message, ...args));
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage(message, ...args));
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(message, ...args));
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(message, ...args));
    }
  }
} 