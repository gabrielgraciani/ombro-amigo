import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const uploadConfig = {
  directory: tmpFolder,
  image: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png'];

        if (!allowedMimes.includes(file.mimetype)) {
          return callback(new Error('Invalid file type.'), '');
        }

        return callback(null, fileName);
      },
    }),
  },
  audio: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        const allowedMimes = ['audio/ogg', 'audio/mpeg', 'audio/wav'];

        if (!allowedMimes.includes(file.mimetype)) {
          return callback(new Error('Invalid file type.'), '');
        }

        return callback(null, fileName);
      },
    }),
  },
};

export default uploadConfig;
