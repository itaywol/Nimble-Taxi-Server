import { Injectable, Logger } from '@nestjs/common';

/**
 * self defined logger for ruture use
 * currently functioning the same as default logger
 */
@Injectable()
export class LoggerService extends Logger {
  error(message: any, trace?: string, context?: string): void {
    super.error(message, trace);
  }
  log(message: any, context?: string): void {
    super.log(message, context);
  }
  warn(message: any, context?: string): void {
    super.warn(message, context);
  }
  debug(message: any, context?: string): void {
    super.debug(message.context);
  }
  verbose(message: any, context?: string): void {
    super.verbose(message, context);
  }
}
