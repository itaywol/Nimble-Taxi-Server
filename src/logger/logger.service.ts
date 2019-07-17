import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  error(message: any, trace?: string, context?: string): void {
    super.error(message, trace);
  }
  log(message: any, context?: string): void {
    super.log(message, context);
  }
  warn(message: any, context?: string): void {
    super.warn(message,context);
  }
  debug(message: any, context?: string): void {
    throw new Error('Method not implemented.');
  }
  verbose(message: any, context?: string): void {
    throw new Error('Method not implemented.');
  }
}
