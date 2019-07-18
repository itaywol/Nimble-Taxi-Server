import { Injectable, HttpStatus } from '@nestjs/common';
import { SmsmessagerService } from '../smsmessager/smsmessager.service';
import { HelperModuleService } from '../helper-module/helper-module.service';
import { UserDto } from './dto/user-dto';
import { IUser } from './interfaces/user.interface';
import { LoggerService } from '../logger/logger.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IVerify } from './interfaces/verify.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly smsMessager: SmsmessagerService,
    private readonly helperModule: HelperModuleService,
    @InjectModel('Users') private readonly usersModel: Model<IUser>,
    @InjectModel('Verifies') private readonly verifiesList: Model<IVerify>,
  ) {}

  /**
   * VerifyUser:
   * is called from the controller(/auth/verify)
   * checks if the user entered the right verfication code
   * @param verify: takes an IVerfy(interface) oriented parameters
   */
  async verifyUser(verify: IVerify) {
    LoggerService.log('Verifing one user:' + JSON.stringify(verify));
    return await this.verifiesList.findOne(verify).then((item: IVerify) => {
      if (item && item.code === verify.code) {
        this.verifiesList.remove(verify);
        return this.usersModel.updateOne(
          { phoneNumber: item.phoneNumber },
          { Verified: true },
        );
      }
      return HttpStatus.UNAUTHORIZED;
    });
  }
  /**
   * generate a verfication sms to the user
   * @param userData to fetch the user and use its data to send an sms message
   */
  async generateVerficationSms(userData: UserDto) {
    const digitalCode = this.helperModule.generateDigitalNumber(6);
    this.smsMessager.composeVerifyMessage(userData.phoneNumber, digitalCode);
    const newVerify = {
      phoneNumber: userData.phoneNumber,
      code: digitalCode,
    } as IVerify;
    const verifyEntry = new this.verifiesList(newVerify);
    return await verifyEntry.save();
  }

  /**
   * register the user to the db
   * first validate if it dont exist
   * then registers
   * @param userData the user data as userDTO object
   */
  async registerUser(userData: UserDto) {
    const checkIfRegistered = await this.fetchOneUser(userData);
    if (checkIfRegistered) {
      const { password, ...result } = userData;
      return result;
    }
    const createdUser = new this.usersModel({ ...userData, Verified: false });
    await this.generateVerficationSms(userData);
    LoggerService.log('Registered new User: ' + JSON.stringify(userData));
    let censoredData = userData;
    delete censoredData.password;
    return censoredData;
  }

  /**
   * calls to login the user return ok if managed to login or unauthorized if not
   * TODO:take a auth_token and not a user
   * TODO:response message shouldnt be an HTTPStatus, done it temporarly
   * @param userData 
   */
  async loginUser(userData: UserDto) {
    return await this.fetchOneUser(userData).then(props => {
      if (props.password != userData.password) {
        return HttpStatus.UNAUTHORIZED;
      }
      return HttpStatus.OK;
    });
  }

  /**
   * finds one user from the model
   * @param userData takes user data as paramters for find in db query
   */
  async fetchOneUser(userData: UserDto): Promise<IUser> {
    const user = await this.usersModel.findOne(userData);
    LoggerService.log('Fetched one user: ' + JSON.stringify(user));
    return user;
  }

  /**
   * returns all users from the db
   */
  async fetchAllUsers() {
    LoggerService.log('Trying to Fetch all users');
    return await this.usersModel.find().exec();
  }

  /**
   * changes the user
   * @param userPhone as identifier for the fetching
   * @param newUserData as new data to apply to the found user
   */
  async changeUser(userPhone: String, newUserData: IUser): Promise<IUser> {
    return await this.usersModel.updateMany({phoneNumber:userPhone}, newUserData);
  }

  /**
   * delete a user from the db with specific phone number
   * @param phoneNumber as identifier for the user, find the user based on this paramter
   */
  async deleteUser(phoneNumber: String) {
    return await this.usersModel.remove({phoneNumber:phoneNumber});
  }

  /**
   * delete all users from the model
   * @param password the admin password that is defined inside the .env file
   */
  async deleteAllUsers(password: string) {
    if (password === process.env.ADMIN_PASSWORD) {
      LoggerService.warn('Deleting all users');
      return await this.usersModel.deleteMany({}, () => {});
    } else {
      LoggerService.error(
        'Tried to delete all users, but provided wrong password',
      );
    }
  }
}
