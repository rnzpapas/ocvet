import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), "..", "frontend", "public", "pet");
        
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.split(".")[0] + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });

