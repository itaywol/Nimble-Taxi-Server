import { Document } from 'mongoose';
/**
 * the driver interface for full driver object data
 */
export interface IDriver extends Document {
  phoneNumber: String;
  currentLongtitude: number;
  currentLatitude: number;
  busy: Boolean;
  jobId: Number; //uses to link between a queue job to the specific driver
}
