import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.service";
import { UserRole } from "../enums/user.enums";
import { BadRequetException } from "../exceptions/error.exceptions";

export class TokenService {
  constructor() {}

  generateToken(user: { _id: string; role: string }) {
    let signature = env.userSignature;
    let refreshSignature = env.userRefreshSignature;
    let audience = "User";

    switch (user.role) {
      case UserRole.ADMIN:
      case "0":
        signature = env.adminSignature;
        refreshSignature = env.adminRefreshSignature;
        audience = "Admin";
        break;
      default:
        signature = env.userSignature;
        refreshSignature = env.userRefreshSignature;
        audience = "User";
        break;
    }

    const accessToken = jwt.sign(
      { id: user._id },
      signature,
      {
        expiresIn: env.accessExpiresIn,
        audience,
      } as SignOptions
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      refreshSignature,
      {
        expiresIn: env.refreshExpiresIn,
        audience,
      } as SignOptions
    );

    return { accessToken, refreshToken };
  }

  decodeToken(
    token: string,
    isRefresh: boolean = false,
    role: string = UserRole.USER
  ): JwtPayload | null {
    try {
      let signature = env.userSignature;

      if (isRefresh) {
        signature =
          role === UserRole.ADMIN || role === "0"
            ? env.adminRefreshSignature
            : env.userRefreshSignature;
      } else {
        signature =
          role === UserRole.ADMIN || role === "0"
            ? env.adminSignature
            : env.userSignature;
      }

      const decoded = jwt.verify(token, signature) as JwtPayload;
      return decoded;
    } catch {
      return null;
    }
  }

  verifyAccessToken(token: string): JwtPayload {
    const secrets = [
      env.userSignature,
      env.adminSignature,
    ];

    for (const secret of secrets) {
      try {
        return jwt.verify(token, secret) as JwtPayload;
      } catch {
        continue;
      }
    }

    throw new BadRequetException("token not valid");
  }

  verifyRefreshToken(token: string): JwtPayload {
    const secrets = [
      env.userRefreshSignature,
      env.adminRefreshSignature,
    ];

    for (const secret of secrets) {
      try {
        return jwt.verify(token, secret) as JwtPayload;
      } catch {
        continue;
      }
    }

    throw new BadRequetException("refresh token not valid");
  }
}

export const tokenService = new TokenService();
