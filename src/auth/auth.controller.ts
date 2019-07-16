import {
  Controller,
  Get,
  Body,
  Post,
  Req,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from 'src/auth/dto/user-dto';
import { IUser } from 'src/auth/interfaces/user.interface';
import { IVerify } from 'src/auth/interfaces/verify.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify')
  async verifyUser(@Body() verify: IVerify) {
    return this.authService.verifyUser(verify);
  }
  @Post('register')
  async register(@Body() registerUser: UserDto) {
    return this.authService.registerUser(registerUser);
  }

  @Post('login')
  async login(@Body() userData: UserDto) {
    return this.authService.loginUser(userData);
  }

  @Get('user')
  async fetchAllUsers() {
    return await this.authService.fetchAllUsers();
  }

  @Get('user/:phone')
  async fetchOneUser(@Param('phone') phoneNumber: string) {
    return this.authService.fetchOneUser({
      phoneNumber: phoneNumber,
    } as UserDto);
  }

  @Put('user')
  async changeUser(
    @Body('oldUser') userData: IUser,
    @Body('newUser') newUserData: IUser,
  ) {
    return this.authService.changeUser(userData, newUserData);
  }

  @Delete('user')
  async removeAllUsers(@Body('password') password: string) {
    return this.authService.deleteAllUsers(password);
  }

  @Delete('user/:phone')
  async removeUser(@Body() userData: IUser) {
    return this.authService.deleteUser(userData);
  }
}
