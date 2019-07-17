import { Document } from 'mongoose';
export interface IDriver extends Document {
  phoneNumber: String;
  currentLocation: String;
  busy: Boolean;
  jobId: Number;
}
