import { Schema, model, models } from "mongoose";
import { IUser } from "../../common/interfaces/user.interface";
import { GenderEnum, UserRole } from "../../common/enums/user.enums";

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
      minlength: 5,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    gender: {
      type: String,
      enum: Object.values(GenderEnum),
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = models.User || model<IUser>("User", userSchema);

export default userModel;
