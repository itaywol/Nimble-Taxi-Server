import { User } from "./user.interface";
import { PaymentType } from "src/enums/paymentType.enum";

export interface Ride {
    from:string,
    to:string,
    price:Number,
    driver:User,
    rideStart:Date,
    rideEnd:Date,
    paymentType:PaymentType
}
