import { friendsService } from "../friends.service";

class FriendResolver {
  constructor() {}

  async getFriends(_parent: any, args: { userId: string }) {
    return friendsService.getFriends(args.userId);
  }

  async getPendingRequests(_parent: any, args: { userId: string }) {
    return friendsService.getPendingRequests(args.userId);
  }

  async sendFriendRequest(
    _parent: any,
    args: { fromUserId: string; toUserId: string }
  ) {
    return friendsService.sendFriendRequest(args.fromUserId, {
      toUserId: args.toUserId,
    });
  }

  async acceptFriendRequest(
    _parent: any,
    args: { userId: string; requestId: string }
  ) {
    return friendsService.acceptFriendRequest(args.userId, args.requestId);
  }

  async rejectFriendRequest(
    _parent: any,
    args: { userId: string; requestId: string }
  ) {
    return friendsService.rejectFriendRequest(args.userId, args.requestId);
  }
}

export const friendResolver = new FriendResolver();
