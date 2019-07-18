import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Roles } from '../enums/roles.enum';
/**
 * defined user schema for the db users collection
 */
export const UserSchema = new mongoose.Schema({
  id: Number,
  phoneNumber: String,
  fullName: String,
  password: String,
  rememberMe: Boolean,
  Verified: Boolean,
  role: Number,
});
