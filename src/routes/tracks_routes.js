const express = require('express');
const { getItem, getItems, createItem, updateItem, deleteItem } = require('../controllers/tracks_controllers');
const { createItemValidator, getItemValidator } = require('../validators/tracks_validator');
const { handleValidationErrors } = require('../middlewares/validationHandler_middleware');
const { authMiddleware } = require('../middlewares/session_middleware');
const verifyRol = require('../middlewares/rol_middleware');
const router = express.Router();

router.get('/', authMiddleware,verifyRol(["user","admin"]), getItems)
router.post('/',authMiddleware, verifyRol(["admin"]) ,createItemValidator, handleValidationErrors, createItem)
router.get('/:_id', authMiddleware, verifyRol(["user", "admin"]), getItemValidator, handleValidationErrors, getItem)
router.put('/:_id', authMiddleware, verifyRol(["admin"]), getItemValidator, handleValidationErrors, updateItem)
router.delete('/:_id', authMiddleware, verifyRol("admin"), getItemValidator, handleValidationErrors, deleteItem)



module.exports = router;