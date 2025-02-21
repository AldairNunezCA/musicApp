const express = require('express');
const { getItem, getItems, createItem, updateItem, deleteItem } = require('../controllers/tracks_controllers');
const router = express.Router();

router.get('/', getItems)
router.post('/', createItem)
router.get('/:id', getItem)
router.put('/:id', updateItem)
router.put('/:id', deleteItem)



module.exports = router;