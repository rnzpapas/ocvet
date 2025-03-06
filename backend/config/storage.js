import multer from "multer";
import multerS3 from 'multer-s3';
import { S3Client } from 'aws-sdk/client-s3';
import path from 'path';
require("dotenv").config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const storage = multer.diskStorage({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: "public-read", 
        metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
          cb(null, file.originalname.split(".")[0] + path.extname(file.originalname))
        },
      }),
});

export const upload = multer({ storage: storage });

