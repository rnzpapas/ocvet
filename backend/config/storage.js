import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join("..", "frontend", "public", "pet");
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {

        cb(null, file.originalname.split(".")[0] + path.extname(file.originalname))
    }
})

export const upload = multer({storage: storage});
