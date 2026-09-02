import { Router, type Request, type Response } from "express";
import { SuccessResponse } from "../../common/exceptions/success.responce";
import { auth, userRequest } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../middleware/errorHanling";
import { Validation } from "../../common/service/validation";
import { commentsService } from "./comments.service";
import {
  commentParamsSchema,
  createCommentSchema,
  postCommentsParamsSchema,
} from "./comments.validation";

const router: Router = Router();

router.post(
  "/",
  auth,
  Validation(createCommentSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = await commentsService.createComment(
      (req as userRequest).user.id,
      req.body
    );
    return SuccessResponse({
      res,
      message: "comment created",
      status: 201,
      data,
    });
  })
);

router.get(
  "/post/:postId",
  Validation(postCommentsParamsSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = await commentsService.getCommentsByPost(
      req.params.postId as string
    );
    return SuccessResponse({
      res,
      message: "comments data",
      status: 200,
      data,
    });
  })
);

router.delete(
  "/:id",
  auth,
  Validation(commentParamsSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = await commentsService.deleteComment(
      (req as userRequest).user.id,
      req.params.id as string
    );
    return SuccessResponse({
      res,
      message: "comment deleted",
      status: 200,
      data,
    });
  })
);

export default router;
