const express = require('express');
const { getItem, getItems, createItem, updateItem, deleteItem } = require('../controllers/tracks_controllers');
const { createItemValidator } = require('../validators/tracks_validator');
const { handleValidationErrors } = require('../middlewares/validationHandler_middleware');
const { authMiddleware } = require('../middlewares/session_middleware');
const verifyRol = require('../middlewares/rol_middleware');
const router = express.Router();

router.get('/', authMiddleware, verifyRol(["user"]), getItems)
router.post('/', createItemValidator, handleValidationErrors, createItem)
router.get('/:_id', handleValidationErrors, getItem)
router.put('/:_id', authMiddleware, verifyRol(["user"]), handleValidationErrors, updateItem)
router.delete('/:_id', authMiddleware, verifyRol(["user"]), handleValidationErrors, deleteItem)



module.exports = router;