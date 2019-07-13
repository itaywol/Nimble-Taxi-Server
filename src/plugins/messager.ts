import twilio = require("twilio");
import { Injectable } from "@nestjs/common";

@Injectable()
export default class Messager{

    static smsClient:any = twilio("AC54b88fa0a3dd7f0ab233541ff1e25cb0","8e2449c275e54ad4ff5025dafdf76826");

    constructor(){
        
    }
    //makes a random number from 100000 to 999999 (6 digits)
    static makeRandomSixDigitsCode = () => {
        let rndmNumber = 100000+(Math.floor(Math.random()*8999999));
        return rndmNumber.toString();
    }

    //using the twilio api i can send messages to users, the method below generate a verfication message with code the method returns to code to caller for registering it
    static sendVerficationMessage(phoneNumber:string)
    {
        let rndNm = this.makeRandomSixDigitsCode();
        this.smsClient.messages.create({
            from: "",
            to: phoneNumber,
            body: "Nimble Taxi, here is your verfication code:" + rndNm,
        }, (err,message) => {if(err) console.log(err.message)});

        return rndNm;
    }
}