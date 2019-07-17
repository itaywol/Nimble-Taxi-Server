import { IUser } from './user.interface';
import { PaymentType } from 'src/enums/paymentType.enum';

export interface Ride {
  from: string;
  to: string;
  price: Number;
  driver: IUser;
  rideStart: Date;
  rideEnd: Date;
  paymentType: PaymentType;
}
