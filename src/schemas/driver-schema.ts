import * as mongoose from 'mongoose';

export const DriverSchema = new mongoose.Schema({
  phoneNumber: String,
  currentLocation: String,
  busy: Boolean,
});
