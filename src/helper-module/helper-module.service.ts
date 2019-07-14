import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class HelperModuleService {
    constructor(private readonly loggerService:LoggerService){}

    generateDigitalNumber = (digitsCount:number) => {

        if(digitsCount<=0)
        {
            this.loggerService.error("Tryed to generate a number and recieved wrong digits amount falling back to 6 digits");
            digitsCount = 6;
        }
        let stringTemplate = "";
        for(let i=0;i<digitsCount;i++)
        {
            stringTemplate += Math.round(Math.random()*9);
        }
        this.loggerService.log(`Generated ${digitsCount} digits number: ${stringTemplate}`);
        return stringTemplate;

    }
}
