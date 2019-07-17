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
   * TODO:refactor and beutify the code
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

  async loginUser(userData: UserDto) {
    return await this.fetchOneUser(userData).then(props => {
      if (props.password != userData.password) {
        return HttpStatus.UNAUTHORIZED;
      }
      return HttpStatus.OK;
    });
  }

  async fetchOneUser(userData: UserDto): Promise<IUser> {
    const user = await this.usersModel.findOne(userData);
    LoggerService.log('Fetched one user: ' + JSON.stringify(user));
    return user;
  }

  async fetchAllUsers() {
    LoggerService.log('Trying to Fetch all users');
    return await this.usersModel.find().exec();
  }

  async changeUser(userData: IUser, newUserData: IUser): Promise<IUser> {
    LoggerService.log(
      'Updating user from: ' +
        JSON.stringify(userData) +
        ' to ' +
        JSON.stringify(newUserData),
    );
    return await this.usersModel.updateMany(userData, newUserData);
  }

  async deleteUser(userData: IUser) {
    LoggerService.warn('Deleting one User: ' + JSON.stringify(userData));
    return await this.usersModel.deleteOne(userData);
  }

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
