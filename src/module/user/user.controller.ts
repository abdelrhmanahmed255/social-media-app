import { Router, type Request, type Response } from "express";
import { SuccessResponse } from "../../common/exceptions/success.responce";
import { auth } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../middleware/errorHanling";

const router: Router = Router();

router.get(
  "/profile",
  auth,
  asyncHandler(async (req: Request, res: Response) => {
    return SuccessResponse({
      res,
      message: "user profile",
      status: 200,
      data: (req as any).user,
    });
  })
);

export default router;
