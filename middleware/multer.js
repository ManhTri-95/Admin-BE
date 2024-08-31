const multer = require('multer');
const path = require('path');
const fs = require('fs');

const DOMAIN = process.env.DOMAIN;
const uploadDir = path.resolve(__dirname, '../public/uploads/images');

// Kiểm tra và tạo thư mục 'uploads' nếu chưa tồn tại
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];

  if(allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    return cb(new Error("Invalid file type."), false );
  }
};

const maxSize = 5 * 1024 * 1024;

const fileLimits = {
  fileSize: maxSize,
  files: 4,
}


const deleteImage = (imageUrl) => {
  const imagePath = path.join(__dirname, '../public', imageUrl.replace(DOMAIN, ''));
  try {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`Image deleted: ${imagePath}`);
    } else {
      console.log(`Image not found: ${imagePath}`);
    }
  } catch (error) {
    console.error(`Error deleting image: ${error.message}`);
  }
}


const upload  = multer({ storage: storage, fileFilter: fileFilter, limits: fileLimits });

module.exports = {
  upload, deleteImage 
}