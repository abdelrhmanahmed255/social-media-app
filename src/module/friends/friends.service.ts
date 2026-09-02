import {
  BadRequetException,
  ForbiddenException,
  NotFoundException,
} from "../../common/exceptions/error.exceptions";
import { FriendRequestStatus, IFriend } from "../../common";
import friendModel from "../../database/model/friend.model";
import userModel from "../../database/model/user.model";
import { DatabaseRepository } from "../../database/repository/database.repository";
import { SendFriendRequestBody } from "./friends.validation";

export class FriendsService {
  private friendRepository: DatabaseRepository<IFriend>;

  constructor() {
    this.friendRepository = new DatabaseRepository<IFriend>(friendModel);
  }

  async sendFriendRequest(fromUserId: string, data: SendFriendRequestBody) {
    const receiver = await userModel.findById(data.toUserId);

    if (!receiver) {
      throw new NotFoundException("user not found");
    }

    if (fromUserId === data.toUserId) {
      throw new BadRequetException("cannot send friend request to yourself");
    }

    const existing = await this.friendRepository.findOne({
      filter: {
        $or: [
          { fromUser: fromUserId, toUser: data.toUserId },
          { fromUser: data.toUserId, toUser: fromUserId },
        ],
      },
      lean: false,
    });

    if (existing) {
      throw new BadRequetException("friend request already exists");
    }

    const request = await this.friendRepository.create({
      fromUser: fromUserId,
      toUser: data.toUserId,
      status: FriendRequestStatus.PENDING,
    });

    return request;
  }

  async acceptFriendRequest(userId: string, requestId: string) {
    const request = await this.friendRepository.findById({
      id: requestId,
      lean: false,
    });

    if (!request) {
      throw new NotFoundException("friend request not found");
    }

    if (String(request.toUser) !== userId) {
      throw new ForbiddenException("you can only accept requests sent to you");
    }

    if (request.status !== FriendRequestStatus.PENDING) {
      throw new BadRequetException("friend request is not pending");
    }

    const updated = await this.friendRepository.findByIdAndUpdate({
      id: requestId,
      data: { status: FriendRequestStatus.ACCEPTED },
    });

    return updated;
  }

  async rejectFriendRequest(userId: string, requestId: string) {
    const request = await this.friendRepository.findById({
      id: requestId,
      lean: false,
    });

    if (!request) {
      throw new NotFoundException("friend request not found");
    }

    if (String(request.toUser) !== userId) {
      throw new ForbiddenException("you can only reject requests sent to you");
    }

    if (request.status !== FriendRequestStatus.PENDING) {
      throw new BadRequetException("friend request is not pending");
    }

    const updated = await this.friendRepository.findByIdAndUpdate({
      id: requestId,
      data: { status: FriendRequestStatus.REJECTED },
    });

    return updated;
  }

  async getFriends(userId: string) {
    return this.friendRepository.findAll({
      filter: {
        status: FriendRequestStatus.ACCEPTED,
        $or: [{ fromUser: userId }, { toUser: userId }],
      },
      populate: [
        { path: "fromUser", select: "userName email profileImage" },
        { path: "toUser", select: "userName email profileImage" },
      ],
    });
  }

  async getPendingRequests(userId: string) {
    return this.friendRepository.findAll({
      filter: {
        toUser: userId,
        status: FriendRequestStatus.PENDING,
      },
      populate: { path: "fromUser", select: "userName email profileImage" },
    });
  }
}

export const friendsService = new FriendsService();
