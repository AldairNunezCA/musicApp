const express = require ('express');
const { uploadItem, getItems, getItem, deleteItem } = require('../controllers/storage_controllers');
const {storageMiddleware} = require('../middlewares/storage_middleware');
const { getItemValidator } = require('../validators/tracks_validator');
const { handleValidationErrors } = require('../middlewares/validationHandler_middleware');
const router = express.Router();

router.get("/", getItems);
router.post("/", storageMiddleware.single('myFile'), uploadItem);
router.get("/:_id", getItemValidator, handleValidationErrors, getItem)
router.delete("/:_id", getItemValidator, handleValidationErrors, deleteItem);

module.exports = router