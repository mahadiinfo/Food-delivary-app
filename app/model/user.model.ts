import mongoose from "mongoose";

interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  mobileNumber?: string;
  roles: "user" | "admin" | "deliveryboy";
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobileNumber: {
      type: String,
      required: false,
    },
    roles: {
      type: String,
      enum: ["user", "admin", "deliveryboy"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;