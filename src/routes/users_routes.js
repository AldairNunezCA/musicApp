const express = require('express');
const { authMiddleware } = require('../middlewares/session_middleware');
const verifyRol = require('../middlewares/rol_middleware');
const { getUsers, modifyUser, deleteUser } = require('../controllers/users_controllers');
const router = express.Router();

router.get('/', getUsers )
router.put('/:_id', authMiddleware, verifyRol(['admin','user']), modifyUser)
router.delete('/:_id', authMiddleware, verifyRol(['admin','user']), deleteUser)

module.exports = router;