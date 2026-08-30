import { GenderEnum, UserRole } from "../enums/user.enums";

export interface IUser {
  _id?: string;
  userName: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole | string;
  gender?: GenderEnum | string;
  confirmEmail?: boolean;
  profileImage?: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
