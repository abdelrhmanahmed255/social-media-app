import { Router, type Request, type Response } from "express";
import { SuccessResponse } from "../../common/exceptions/success.responce";
import { auth } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../middleware/errorHanling";

const router: Router = Router();

router.get(
  "/",
  auth,
  asyncHandler(async (req: Request, res: Response) => {
    return SuccessResponse({
      res,
      message: "posts module ready",
      status: 200,
      data: [],
    });
  })
);

export default router;
