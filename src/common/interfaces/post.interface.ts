import { Types } from "mongoose";

export interface IPost {
  _id?: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  content: string;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
