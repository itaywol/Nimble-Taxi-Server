import * as mongoose from 'mongoose';

export const VerifySchema = new mongoose.Schema({
  phoneNumber: String,
  code: String,
});
