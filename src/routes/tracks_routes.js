const express = require('express');
const { getItem, getItems, createItem, updateItem, deleteItem } = require('../controllers/tracks_controllers');
const { createItemValidator, getItemValidator } = require('../validators/tracks_validator');
const { handleValidationErrors } = require('../middlewares/validationHandler_middleware');
const router = express.Router();

router.get('/', getItems)
router.post('/', createItemValidator, handleValidationErrors, createItem)
router.get('/:_id', getItemValidator, handleValidationErrors, getItem)
router.put('/:_id', getItemValidator, handleValidationErrors, updateItem)
router.delete('/:_id', getItemValidator, handleValidationErrors, deleteItem)



module.exports = router;