import { Request } from 'express';
import multer from 'multer';
import path from 'path';

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export const generateStorage = (folder: string) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'uploads', folder));
    },
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  });
};

// Callback untuk validasi tipe file
const validateFile = (allowedMimeTypes: string[]) => {
  return (req: Request, file: MulterFile, cb: multer.FileFilterCallback) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  };
};

export const mUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: validateFile(['image/jpeg', 'image/png', 'image/jpg', 'image/gif']),
}) as multer.Multer;

