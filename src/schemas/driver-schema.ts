import * as mongoose from "mongoose";

export const DriverSchema = mongoose.Schema({
    phoneNumber:String,
    currentLocation:String,
    busy:Boolean,
});