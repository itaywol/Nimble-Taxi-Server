import { Controller, Post, Param, Body } from '@nestjs/common';
import messager from "../../plugins/messager";
import { ConsoleLogger } from 'src/plugins/logger';

@Controller('phone')
export class PhoneVerifierController{
    @Post()
    async sendVerifyMessage(@Body() phoneNumber:string)
    {
        console.log(phoneNumber);
        //messager.sendVerficationMessage(phoneNumber); not working because messaging api requires payment
        //for now lets say it accepts only one phone number (0544207711)
        
        return {accessToken:true};
    }

}
