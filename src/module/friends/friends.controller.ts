import { Router, type Request, type Response } from "express";
import { SuccessResponse } from "../../common/exceptions/success.responce";
import { auth, userRequest } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../middleware/errorHanling";
import { Validation } from "../../common/service/validation";
import { friendsService } from "./friends.service";
import {
  friendRequestParamsSchema,
  sendFriendRequestSchema,
} from "./friends.validation";

const router: Router = Router();

router.post(
  "/send",
  auth,
  Validation(sendFriendRequestSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = await friendsService.sendFriendRequest(
      (req as userRequest).user.id,
      req.body
    );
    return SuccessResponse({
      res,
      message: "friend request sent",
      status: 201,
      data,
    });
  })
);

router.post(
  "/accept/:id",
  auth,
  Validation(friendRequestParamsSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = await friendsService.acceptFriendRequest(
      (req as userRequest).user.id,
      req.params.id as string
    );
    return SuccessResponse({
      res,
      message: "friend request accepted",
      status: 200,
      data,
    });
  })
);

router.post(
  "/reject/:id",
  auth,
  Validation(friendRequestParamsSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = await friendsService.rejectFriendRequest(
      (req as userRequest).user.id,
      req.params.id as string
    );
    return SuccessResponse({
      res,
      message: "friend request rejected",
      status: 200,
      data,
    });
  })
);

router.get(
  "/",
  auth,
  asyncHandler(async (req: Request, res: Response) => {
    const data = await friendsService.getFriends((req as userRequest).user.id);
    return SuccessResponse({
      res,
      message: "friends data",
      status: 200,
      data,
    });
  })
);

router.get(
  "/requests",
  auth,
  asyncHandler(async (req: Request, res: Response) => {
    const data = await friendsService.getPendingRequests(
      (req as userRequest).user.id
    );
    return SuccessResponse({
      res,
      message: "pending friend requests",
      status: 200,
      data,
    });
  })
);

export default router;
