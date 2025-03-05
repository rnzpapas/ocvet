import multer from "multer";
import path from "path";

import multer from "multer";
import path from "path";
import fs from "fs";

// Define the destination path for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the path to the public pet folder in frontend
        const uploadDir = path.join(__dirname, "..", "..", "frontend", "public", "pet");

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir); // Provide the destination directory
    },
    filename: (req, file, cb) => {
        // Set the filename to be the original file name
        cb(null, file.originalname.split(".")[0] + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });

