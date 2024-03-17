import { Document, Schema, model, models } from "mongoose";

export interface UUser extends Document {
  firstName?: String;
  lastName?: String;
  clerkId: String;
  userName: String;
  email: String;
  planId: String;
  photo: String;
  creditBalance: Number;
}

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  clerkId: { type: String, required: true, unique: true },
  userName: { type: String, reuqired: true, unique: true },
  email: { type: String, required: true, unique: true },
  planId: { type: Number, deafult: 1 },
  photo: { type: String, required: true },
  creditBalance: { type: Number, deafult: 10 },
});

const User = models?.User || model("User", userSchema);
export default User;
