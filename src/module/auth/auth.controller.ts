import { Router, type Request, type Response } from "express";
import { authService } from "./auth.service";
import { SuccessResponse } from "../../common/exceptions/success.responce";
import { auth, userRequest } from "../../middleware/auth.middleware";
import { checkRole } from "../../middleware/checkrole.middleware";
import { asyncHandler } from "../../middleware/errorHanling";
import { Validation } from "../../common/service/validation";
import {
  getUserParamsSchema,
  loginSchema,
  refreshTokenSchema,
  signupSchema,
} from "./auth.validation";
import { uploadFile } from "../../common/utils/multer";
import { MulterStorageEnum } from "../../common/enums/multer.enum";

const router: Router = Router();

router.post(
  "/login",
  Validation(loginSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const loginUser = await authService.login(req.body);
    return SuccessResponse({
      res,
      message: "login successfully",
      status: 200,
      data: loginUser,
    });
  })
);

router.post(
  "/signup",
  uploadFile(MulterStorageEnum.diskStorage).single("file"),
  Validation(signupSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = await authService.signup(
      req.body,
      req.file as Express.Multer.File
    );
    return SuccessResponse({
      res,
      message: "signup user",
      status: 200,
      data,
    });
  })
);

router.post(
  "/refresh-token",
  Validation(refreshTokenSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const data = await authService.refreshToken(req.body);
    return SuccessResponse({
      res,
      message: "token refreshed",
      status: 200,
      data,
    });
  })
);

router.get(
  "/get-all-users/:id",
  auth,
  checkRole(["1", "0"]),
  Validation(getUserParamsSchema),
  asyncHandler(async (req: Request, res: Response) => {
    console.log((req as userRequest).user);
    const usersData = await authService.getAllUsers(req.params.id as string);
    return SuccessResponse({
      res,
      message: "users data",
      status: 200,
      data: usersData,
    });
  })
);

export default router;
