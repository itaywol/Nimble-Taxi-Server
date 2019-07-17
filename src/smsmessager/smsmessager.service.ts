import { Injectable, NotAcceptableException } from '@nestjs/common';
import nexmo = require('nexmo');
import { LoggerService } from '../logger/logger.service';
import 'dotenv/config';

@Injectable()
export class SmsmessagerService {
  nexmo = new nexmo({
    apiKey: process.env.NEXMO_KEY,
    apiSecret: process.env.NEXMO_SECRET,
  });
  constructor(private readonly loggerService: LoggerService) {}

  composeVerifyMessage(to: string, additionalText: string) {
    try {
      let placeHolderPhone;
      placeHolderPhone = this.convertFromLocalToGlobal(to);
      if (!this.validatePhoneNumber(placeHolderPhone)) {
        throw new NotAcceptableException();
      }
      const from = process.env.BRANDNAME;
      const text = process.env.NEXMO_PREFIX_MESSAGE + additionalText;
      this.nexmo.message.sendSms(from, placeHolderPhone, text);
    } catch (e) {
      this.loggerService.error(
        'Got a bad phone number or couldnt connect to sms api - ' + e,
      );
    }
  }

  validatePhoneNumber(phoneNumber: string) {
    if (phoneNumber.length == 12) {
      return true;
    }
    return false;
  }

  convertFromLocalToGlobal(phoneNumber: string) {
    if (phoneNumber.indexOf('0') == 0) {
      return phoneNumber.slice(1).padStart(3, '972');
    }
    if (phoneNumber.indexOf('+') == 0) {
      return phoneNumber.slice(1);
    }
    return phoneNumber;
  }
}
