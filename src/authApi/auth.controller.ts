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
import { AuthService } from './auth.service';
import { UserDto } from './dto/user-dto';
import { IUser } from './interfaces/user.interface';
import { IVerify } from './interfaces/verify.interface';

/**
 * Auth controller controls all the authing with REST api calls
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * calls to verify a user by IVerify data that has been sent to this route
   * @param verify the request data must contain verify object paramaters
   */
  @Post('verify')
  async verifyUser(@Body() verify: IVerify) {
    return this.authService.verifyUser(verify);
  }
  /**
   * call the register user method from the services
   * @param registerUser the request data must contain USERDTO object parameters
   */
  @Post('register')
  async register(@Body() registerUser: UserDto) {
    return this.authService.registerUser(registerUser);
  }
  /**
   * call the login method from the auth services
   * @param userData the request data must contain userdto to procees the login request
   */
  @Post('login')
  async login(@Body() userData: UserDto) {
    return this.authService.loginUser(userData);
  }
  /**
   * returns all the users from the auth service fetchalluser(find all from the DB)
   */
  @Get('user')
  async fetchAllUsers() {
    return await this.authService.fetchAllUsers();
  }
  /**
   * call the auth service fetch one user(finds one user matching the paramters)
   * @param phoneNumber using the phone number as identifier for a user
   */
  @Get('user/:phone')
  async fetchOneUser(@Param('phone') phoneNumber: string) {
    return this.authService.fetchOneUser({
      phoneNumber: phoneNumber,
    } as UserDto);
  }
  /**
   * call the auth service to change user based on passing paramters
   * @param phoneNumber the old user phone number a s identifier
   * @param newUserData the new user Data as IUder
   */
  @Put('user/:phone')
  async changeUser(
    @Param('phone') phoneNumber: String,
    @Body('newUser') newUserData: IUser,
  ) {
    return this.authService.changeUser(phoneNumber, newUserData);
  }

  /**
   * removes all users(developing use only)
   * @param password the admin password that defined in .env file
   */
  @Delete('user')
  async removeAllUsers(@Body('password') password: string) {
    return this.authService.deleteAllUsers(password);
  }

  /**
   * remove a specific user using the auth service
   * @param userData 
   */
  @Delete('user/:phone')
  async removeUser(@Param("phone") phoneNumber: String) {
    return this.authService.deleteUser(phoneNumber);
  }
}
