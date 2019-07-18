import { Roles } from '../../enums/roles.enum';
import { Document } from 'mongoose';

/**
 * the verfication object interface
 */
export interface IVerify extends Document {
  phoneNumber: string;
  code: string;
}
