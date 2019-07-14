import { Injectable } from '@nestjs/common';
import { SmsmessagerService } from 'src/smsmessager/smsmessager.service';
import { HelperModuleService } from 'src/helper-module/helper-module.service';

@Injectable()
export class AuthService {
    constructor(private readonly smsMessager:SmsmessagerService, private readonly helperModule:HelperModuleService){}

    verifyPhone(phoneNumber:string){
        this.smsMessager.compose(phoneNumber, this.helperModule.generateDigitalNumber(6));
    }

    registerUser(){
    }

    fetchOneUser(){

    }

    fetchAllUsers(){

    }

    changeUser(){

    }

    deleteUser(){

    }
}
