import { Injectable } from "@nestjs/common";

@Injectable()
export class ConsoleLogger
{
    log(message:string):void{
        console.log(`[${Date.now()} - ${message}`);
    }
}