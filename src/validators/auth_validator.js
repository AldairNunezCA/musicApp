const { check } = require('express-validator'); 


const registerUserValidator = [
    check('name')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
        .notEmpty().withMessage('Name is required'),
    
    check('age')
        .isInt({ min: 1 }).withMessage('Age must be a positive number')
        .notEmpty().withMessage('Age is required'),
    
    check('email')
        .isEmail().withMessage('Invalid email format')
        .notEmpty().withMessage('Email is required'),
    
    check('password')
        .isLength({ min: 3, max: 15 }).withMessage('Password must be between 3 and 15 characters')
        .notEmpty().withMessage('Password is required'),

];

const loginUserValidator = [
    check('email')
        .isEmail().withMessage('Invalid email format')
        .notEmpty().withMessage('Email is required'),

    check('password')
        .isLength({ min: 3, max: 15 }).withMessage('Password must be between 3 and 15 characters')
        .notEmpty().withMessage('Password is required')
]

module.exports = { registerUserValidator, loginUserValidator };
