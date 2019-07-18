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

  /**
   * sends an sms message(currently only to 972544207711 registered in the api) because nexmo is free and not pro
   * @param to phone number 
   * @param additionalText additional text to apply for the verfication message
   */
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

  /**
   * simple phone validation based on characters length
   * TODO:verify country code and that all of the characters are numbers ....
   * @param phoneNumber 
   */
  validatePhoneNumber(phoneNumber: string) {
    if (phoneNumber.length == 12) {
      return true;
    }
    return false;
  }

  /**
   * convert a phone number that starts in local 0 to 972 global il number
   * @param phoneNumber the phone number with local phone prefix
   */
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
