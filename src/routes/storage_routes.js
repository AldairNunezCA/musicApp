const express = require ('express');
const { uploadItem, getItems, getItem, deleteItem } = require('../controllers/storage_controllers');
const {storageMiddleware} = require('../middlewares/storage_middleware');
const { handleValidationErrors } = require('../middlewares/validationHandler_middleware');
const { authMiddleware } = require('../middlewares/session_middleware');
const verifyRol = require('../middlewares/rol_middleware');
const router = express.Router();

router.get("/", getItems);
router.post("/", storageMiddleware.single('myFile'), uploadItem);
router.get("/:_id", handleValidationErrors, getItem)
router.delete("/:_id", handleValidationErrors, deleteItem);

module.exports = router 