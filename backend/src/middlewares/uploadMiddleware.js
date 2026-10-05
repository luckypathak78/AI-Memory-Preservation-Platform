import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },

  fileFilter(req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();

    if (extension !== ".txt") {
      return cb(
        new Error("Only .txt WhatsApp chat files are allowed.")
      );
    }

    cb(null, true);
  },
});

export default upload;