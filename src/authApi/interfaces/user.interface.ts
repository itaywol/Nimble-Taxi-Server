import { Roles } from 'src/enums/roles.enum';
import { Document } from 'mongoose';

export interface IUser extends Document {
  phoneNumber: string;
  fullName: string;
  password: string;
  rememberMe: Boolean;
  Verified: boolean;
  role: Roles;
}
