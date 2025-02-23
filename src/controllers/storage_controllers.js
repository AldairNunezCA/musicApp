const { uploadItemService } = require ('../services/storage_services')
const uploadItem = async (req, res) => {
    try {
      const myFile = req.file
      console.log(myFile)
      const result = await uploadItemService(myFile)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  module.exports = { uploadItem }