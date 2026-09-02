import { Types } from "mongoose";
import { FriendRequestStatus } from "../enums/friend.enums";

export interface IFriend {
  _id?: Types.ObjectId | string;
  fromUser: Types.ObjectId | string;
  toUser: Types.ObjectId | string;
  status: FriendRequestStatus | string;
  createdAt?: Date;
  updatedAt?: Date;
}
