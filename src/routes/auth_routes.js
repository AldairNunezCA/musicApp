const express = require('express')
const { registerUserValidator, loginUserValidator } = require('../validators/auth_validator')
const { registerUser, loginUser, loginGoogle } = require('../controllers/auth_controllers');
const { handleValidationErrors } = require('../middlewares/validationHandler_middleware');
const passport = require("../config/passport");


const router = express.Router();


router.post('/register', registerUserValidator, handleValidationErrors, registerUser );
router.post('/login', loginUserValidator, handleValidationErrors, loginUser)
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/login/google/callback', passport.authenticate('google', { session: false }), loginGoogle);

module.exports = router;