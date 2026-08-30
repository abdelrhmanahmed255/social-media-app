import {
  GetObjectCommand,
  S3Client,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream } from "fs";
import { env } from "../../config/env.service";
import { MulterStorageEnum } from "../enums/multer.enum";

export class S3Service {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: env.awsRegion,
      credentials:
        env.awsAccessKeyId && env.awsSecretAccessKey
          ? {
              accessKeyId: env.awsAccessKeyId,
              secretAccessKey: env.awsSecretAccessKey,
            }
          : undefined,
    });
  }

  async uploadFile({
    storageKey,
    Bucket = env.BucketName,
    path,
    file,
    ACL = "private" as ObjectCannedACL,
    contentType,
  }: {
    storageKey: MulterStorageEnum;
    Bucket?: string;
    path: string;
    file: Express.Multer.File;
    ACL?: ObjectCannedACL;
    contentType?: string;
  }) {
    if (!Bucket) {
      return {
        Key: `local/${path}/${Date.now()}-${file.originalname}`,
        local: true,
      };
    }

    const Key = `SocialMedia/${path}/${Math.round(Date.now() / 1000)}-${file.originalname}`;

    const Body =
      storageKey === MulterStorageEnum.memoryStorage
        ? file.buffer
        : createReadStream(file.path);

    const result = new Upload({
      client: this.client,
      params: {
        Bucket,
        Key,
        Body,
        ACL,
        ContentType: contentType || file.mimetype,
      },
    });

    result.on("httpUploadProgress", (progress) => {
      if (progress.loaded && progress.total) {
        console.log(
          `${((progress.loaded as number) / (progress.total as number)) * 100}%`
        );
      }
    });

    await result.done();
    return { Key, Bucket };
  }

  async getFile({
    Bucket = env.BucketName,
    Key,
  }: {
    Bucket?: string;
    Key: string;
  }) {
    const file = new GetObjectCommand({
      Bucket,
      Key,
    });

    return await this.client.send(file);
  }
}

export const s3Service = new S3Service();
