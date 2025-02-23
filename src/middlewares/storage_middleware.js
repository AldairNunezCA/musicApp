const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req,res,cb){
    const pathStorage = `${__dirname}/../storage`
    cb(null, pathStorage)
  },
  filename: function  (req, file, cb){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = file.originalname.split('.').pop()
    cb(null, file.fieldname + `-` + uniqueSuffix + `.` + ext);
  }
});

const storageMiddleware = multer({ storage: storage});

module.exports =  {storageMiddleware}