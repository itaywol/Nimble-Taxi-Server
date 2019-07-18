import { Controller, Get, Param } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
    constructor(private readonly googleServices:GoogleService){}
    @Get("places/:name")
    async getPlaceDetails(@Param("name") placeName:string){
        return this.googleServices.queryPlacesFromGoogle(placeName);
    }
}
