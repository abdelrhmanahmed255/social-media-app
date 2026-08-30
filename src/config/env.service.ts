class EnvService {
  get port(): number {
    return Number(process.env.PORT) || 3000;
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || "development";
  }

  get dbUri(): string {
    return process.env.DB_URI || "mongodb://127.0.0.1:27017/social-media-dev";
  }

  get userSignature(): string {
    return process.env.USER_SIGNATURE || "user-access-secret";
  }

  get userRefreshSignature(): string {
    return process.env.USER_REFRESH_SIGNATURE || "user-refresh-secret";
  }

  get adminSignature(): string {
    return process.env.ADMIN_SIGNATURE || "admin-access-secret";
  }

  get adminRefreshSignature(): string {
    return process.env.ADMIN_REFRESH_SIGNATURE || "admin-refresh-secret";
  }

  get accessExpiresIn(): string {
    return process.env.ACCESS_EXPIRES_IN || "30m";
  }

  get refreshExpiresIn(): string {
    return process.env.REFRESH_EXPIRES_IN || "1y";
  }

  get emailHost(): string {
    return process.env.EMAIL_HOST || "smtp.gmail.com";
  }

  get emailPort(): number {
    return Number(process.env.EMAIL_PORT) || 587;
  }

  get emailUser(): string {
    return process.env.EMAIL_USER || "";
  }

  get emailPass(): string {
    return process.env.EMAIL_PASS || "";
  }

  get emailFrom(): string {
    return process.env.EMAIL_FROM || "noreply@socialmedia.com";
  }

  get awsAccessKeyId(): string {
    return process.env.AWS_ACCESS_KEY_ID || "";
  }

  get awsSecretAccessKey(): string {
    return process.env.AWS_SECRET_ACCESS_KEY || "";
  }

  get awsRegion(): string {
    return process.env.AWS_REGION || "us-east-1";
  }

  get awsBucketName(): string {
    return process.env.AWS_BUCKET_NAME || "";
  }

  get BucketName(): string {
    return process.env.AWS_BUCKET_NAME || "";
  }
}

export const env = new EnvService();
