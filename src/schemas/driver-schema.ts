import * as mongoose from 'mongoose';

/**
 * database driver schema for the drivers collection
 */
export const DriverSchema = new mongoose.Schema({
  phoneNumber: String,
  currentLongtitude: Number,
  currentLatitude: Number,
  busy: Boolean,
});
