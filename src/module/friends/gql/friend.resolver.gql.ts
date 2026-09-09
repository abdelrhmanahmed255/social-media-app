import { friendsService } from "../friends.service";

class FriendResolver {
  constructor() {}

  async getFriends(parent: any, args: { userId: string }) {
    const friends = await friendsService.getFriends(args.userId);
    return { message: friends };
  }

  async getPendingRequests(parent: any, args: { userId: string }) {
    const requests = await friendsService.getPendingRequests(args.userId);
    return { message: requests };
  }

  async sendFriendRequest(
    parent: any,
    args: { fromUserId: string; toUserId: string }
  ) {
    return friendsService.sendFriendRequest(args.fromUserId, {
      toUserId: args.toUserId,
    });
  }

  async acceptFriendRequest(
    parent: any,
    args: { userId: string; requestId: string }
  ) {
    return friendsService.acceptFriendRequest(args.userId, args.requestId);
  }

  async rejectFriendRequest(
    parent: any,
    args: { userId: string; requestId: string }
  ) {
    return friendsService.rejectFriendRequest(args.userId, args.requestId);
  }
}

export const friendResolver = new FriendResolver();
