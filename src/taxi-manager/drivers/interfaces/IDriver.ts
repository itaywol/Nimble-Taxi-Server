import { Document } from 'mongoose';
export interface IDriver extends Document {
  phoneNumber: String;
  currentLongtitude: number;
  currentLatitude: number;
  busy: Boolean;
  jobId: Number;
}
