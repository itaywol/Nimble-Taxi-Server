import * as mongoose from 'mongoose';

export const DriverSchema = new mongoose.Schema({
  phoneNumber: String,
  currentLongtitude: Number,
  currentLatitude: Number,
  busy: Boolean,
});
