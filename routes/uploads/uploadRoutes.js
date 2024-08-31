const express = require('express');

const { upload } = require('../../middleware/multer');

const ImageController = require('../../controllers/uploads/uploadSingle');

const router = express.Router();

router.post('/upload-single', upload.single("file"), ImageController.importSingle);

module.exports = router;