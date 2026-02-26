import mongoose from "mongoose";

interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobileNumber?: string;
  image?:string
  role: "user" | "admin" | "deliveryboy";
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
    password: {
      type: String,
      required: false,
    },

    mobileNumber: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "deliveryboy"],
      default: "user",
    },
    image:{
      type:String
    }
    
  },
  {
    timestamps: true,
  },
);
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;