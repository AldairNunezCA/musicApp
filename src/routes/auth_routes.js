const express = require('express')
const { registerUserValidator, loginUserValidator } = require('../validators/auth_validator')
const { registerUser, loginUser } = require('../controllers/auth_controllers');
const { handleValidationErrors } = require('../middlewares/validationHandler_middleware');

const router = express.Router();


router.post('/register', registerUserValidator, handleValidationErrors, registerUser );
router.post('/login', loginUserValidator, handleValidationErrors, loginUser)

module.exports = router;