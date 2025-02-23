const { check } = require('express-validator');

const createItemValidator = [
    check('name')
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name is required'),
    
    check('album')
        .isString().withMessage('Album must be a string')
        .notEmpty().withMessage('Album is required'),
    
    check('cover')
        .isURL().withMessage('Cover must be a valid URL')
        .notEmpty().withMessage('Cover is required'),
    
    check('artist.name')
        .isString().withMessage('Artist name must be a string')
        .notEmpty().withMessage('Artist name is required'),
    
    check('artist.nationality')
        .isString().withMessage('Artist nationality must be a string')
        .notEmpty().withMessage('Artist nationality is required'),
    
    check('duration.start')
        .isInt().withMessage('Start duration must be a number')
        .optional(),
    
    check('duration.end')
        .isInt().withMessage('End duration must be a number')
        .notEmpty().withMessage('End duration is required'),
    
    check('mediaId')
        .isString().withMessage('Media ID must be a string')
        .notEmpty().withMessage('Media ID is required'),
];

const getItemValidator = [
    check('_id')
        .isMongoId().withMessage('ID format is incorrect')
        .notEmpty().withMessage('ID is required'),
];

module.exports = { createItemValidator, getItemValidator };
