import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: Number,
  phoneNumber: String,
  fullName: String,
  password: String,
  rememberMe: Boolean,
  Verified: Boolean,
  role: Number,
});
