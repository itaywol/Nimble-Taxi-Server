import { Controller, Get, Body, Post, Req, Param } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get(":phone")
    async verifyPhone(@Param("phone") phoneNumber:string){
        this.authService.verifyPhone(phoneNumber);
    }

}
