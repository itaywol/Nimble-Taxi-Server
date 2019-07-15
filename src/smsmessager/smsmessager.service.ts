import { Injectable, NotAcceptableException } from '@nestjs/common';
import  Nexmo = require("nexmo");
import Config from 'config';
import { LoggerService } from 'src/logger/logger.service';

let nexmo = new Nexmo({
  apiKey: Config.smsapi_key,
  apiSecret: Config.smsapi_secret,
});;

@Injectable()
export class SmsmessagerService {
  constructor(private readonly loggerService:LoggerService) {
     
  }

  composeVerifyMessage = (to: string, additionalText:string) => {
    try{
        let placeHolderPhone;
        placeHolderPhone = this.convertFromLocalToGlobal(to);
        if(!this.validatePhoneNumber(placeHolderPhone))
        {
            throw new NotAcceptableException();
        }
        const from = Config.smsapi_brandName;
        const text = Config.smsapi_prefix_message + additionalText;
        nexmo.message.sendSms(from,placeHolderPhone,text);
    }catch(e)
    {
        this.loggerService.error("Got a bad phone number or couldnt connect to sms api - " + e);
    }
  };

  validatePhoneNumber = (phoneNumber: string) => {
    
    if (phoneNumber.length==12) {
      return true;
    }
    return false;
  };

  convertFromLocalToGlobal = (phoneNumber: string) => {
    if (phoneNumber.indexOf("0")==0) {
      return phoneNumber.slice(1).padStart(3, '972');
    }
    if (phoneNumber.indexOf("+")==0) {
      return phoneNumber.slice(1);
    }
    return phoneNumber;
  };
}
