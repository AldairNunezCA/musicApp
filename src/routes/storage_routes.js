const express = require ('express');
const { uploadItem, getItems, getItem, deleteItem } = require('../controllers/storage_controllers');
const {storageMiddleware} = require('../middlewares/storage_middleware');
const { getItemValidator } = require('../validators/tracks_validator');
const { handleValidationErrors } = require('../middlewares/validationHandler_middleware');
const { authMiddleware } = require('../middlewares/session_middleware');
const verifyRol = require('../middlewares/rol_middleware');
const router = express.Router();

router.get("/", authMiddleware, verifyRol(["admin"]), getItems);
router.post("/", authMiddleware, verifyRol(["admin"]), storageMiddleware.single('myFile'), uploadItem);
router.get("/:_id", authMiddleware, verifyRol(["admin"]), getItemValidator, handleValidationErrors, getItem)
router.delete("/:_id", authMiddleware, verifyRol(["admin"]), getItemValidator, handleValidationErrors, deleteItem);

module.exports = router