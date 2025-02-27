const express = require ('express');
const { uploadItem, getItems, getItem, deleteItem } = require('../controllers/storage_controllers');
const {storageMiddleware} = require('../middlewares/storage_middleware');
const { handleValidationErrors } = require('../middlewares/validationHandler_middleware');
const { authMiddleware } = require('../middlewares/session_middleware');
const verifyRol = require('../middlewares/rol_middleware');
const router = express.Router();

router.get("/", authMiddleware, verifyRol(["user"]), getItems);
router.post("/", authMiddleware, verifyRol(["user"]), storageMiddleware.single('myFile'), uploadItem);
router.get("/:_id", authMiddleware, verifyRol(["user"]), handleValidationErrors, getItem)
router.delete("/:_id", authMiddleware, verifyRol(["user"]), handleValidationErrors, deleteItem);

module.exports = router 