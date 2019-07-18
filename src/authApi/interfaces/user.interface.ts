import { Roles } from '../../enums/roles.enum';
import { Document } from 'mongoose';

/**
 * the user interface transform the data for the delivery object(request) into a full data to pass the schema(can edit on the backend the missinbg parameters)
 */
export interface IUser extends Document {
  phoneNumber: string;
  fullName: string;
  password: string;
  rememberMe: Boolean;
  Verified: boolean;
  role: Roles;
}
