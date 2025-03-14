const multer = require('multer')
const {s3} = require('../config/s3')
const multerS3 = require('multer-s3')


const uploadMiddleware = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, `tracks/${Date.now().toString()}-${file.originalname}`)
        },
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        }
    })
})


module.exports = { uploadMiddleware }