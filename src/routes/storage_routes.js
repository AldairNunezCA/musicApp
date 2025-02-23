const express = require ('express');
const { uploadItem } = require('../controllers/storage_controllers');
const {storageMiddleware} = require('../middlewares/storage_middleware');
const router = express.Router();

router.post("/", storageMiddleware.single('myFile'), uploadItem);

module.exports = router