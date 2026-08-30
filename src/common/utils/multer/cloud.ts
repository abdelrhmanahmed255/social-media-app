import multer from "multer";
import { tmpdir } from "os";
import { MulterStorageEnum } from "../../enums/multer.enum";

export const uploadFile = (
  storageKey: MulterStorageEnum = MulterStorageEnum.memoryStorage
) => {
  let storage: multer.StorageEngine;

  switch (storageKey) {
    case MulterStorageEnum.diskStorage:
      storage = multer.diskStorage({
        destination: tmpdir(),
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      });
      break;
    case MulterStorageEnum.memoryStorage:
    default:
      storage = multer.memoryStorage();
      break;
  }

  return multer({ storage });
};
