import {
  BadRequetException,
  NotFoundException,
} from "../../common/exceptions/error.exceptions";
import { compareHash, generateHash } from "../../common/security/securety";
import { TokenService } from "../../common/service/token.service";
import { IUser, UserRole } from "../../common";
import userModel from "../../database/model/user.model";
import { DatabaseRepository } from "../../database/repository/database.repository";
import { sendEmail } from "../../common/email/sendEmail";
import { s3Service } from "../../common/service/s3.service";
import { MulterStorageEnum } from "../../common/enums/multer.enum";
import {
  LoginBody,
  RefreshTokenBody,
  SignupBody,
} from "./auth.validation";

export class AuthService {
  private userRepository: DatabaseRepository<IUser>;
  private tokenService: TokenService;

  constructor() {
    this.userRepository = new DatabaseRepository<IUser>(userModel);
    this.tokenService = new TokenService();
  }

  async getAllUsers(id: string) {
    const user = await this.userRepository.findById({
      id,
      select: "email userName role phone profileImage",
    });

    if (!user) {
      throw new NotFoundException("user not found");
    }

    return user;
  }

  async signup(data: SignupBody, file?: Express.Multer.File) {
    const existing = await this.userRepository.findOne({
      filter: { email: data.email },
    });

    if (existing) {
      throw new BadRequetException("email already exists");
    }

    const hashedPassword = await generateHash(data.password);

    let profileImage: string | undefined;

    if (file) {
      const uploaded = await s3Service.uploadFile({
        storageKey: MulterStorageEnum.diskStorage,
        path: "users",
        file,
      });
      profileImage = uploaded.Key;
    }

    const user = await this.userRepository.create({
      userName: data.userName,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      role: UserRole.USER,
      confirmEmail: false,
      profileImage,
    });

    const tokens = this.tokenService.generateToken({
      _id: String(user._id),
      role: String(user.role),
    });

    await this.userRepository.findByIdAndUpdate({
      id: String(user._id),
      data: { refreshToken: tokens.refreshToken },
    });

    await sendEmail({
      to: user.email,
      subject: "Welcome to Social Media App",
      html: `<h2>Welcome ${user.userName}</h2><p>Your account was created successfully.</p>`,
    });

    return {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async login(data: LoginBody) {
    const { email, password } = data;

    const user = await this.userRepository.findOne({
      filter: { email },
      select: "+password email userName role phone profileImage",
      lean: false,
    });

    if (!user) {
      throw new BadRequetException("invalid email or password");
    }

    const isMatch = await compareHash(password, user.password);

    if (!isMatch) {
      throw new BadRequetException("invalid email or password");
    }

    const tokens = this.tokenService.generateToken({
      _id: String(user._id),
      role: String(user.role),
    });

    await this.userRepository.findByIdAndUpdate({
      id: String(user._id),
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshToken(data: RefreshTokenBody) {
    const decoded = this.tokenService.verifyRefreshToken(data.refreshToken);

    if (!decoded?.id) {
      throw new BadRequetException("refresh token not valid");
    }

    const user = await this.userRepository.findById({
      id: decoded.id,
      lean: false,
    });

    if (!user) {
      throw new NotFoundException("user not found");
    }

    if (user.refreshToken && user.refreshToken !== data.refreshToken) {
      throw new BadRequetException("refresh token not valid");
    }

    const tokens = this.tokenService.generateToken({
      _id: String(user._id),
      role: String(user.role),
    });

    await this.userRepository.findByIdAndUpdate({
      id: String(user._id),
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}

export const authService = new AuthService();
