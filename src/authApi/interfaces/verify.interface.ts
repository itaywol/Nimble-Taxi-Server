import { Roles } from '../../enums/roles.enum';
import { Document } from 'mongoose';

export interface IVerify extends Document {
  phoneNumber: string;
  code: string;
}
