import * as mongoose from 'mongoose';

/**
 * defined verfication entry schema for the verfication system(the schema registers verfications to the collection)
 */
export const VerifySchema = new mongoose.Schema({
  phoneNumber: String,
  code: String,
});
