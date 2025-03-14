const { uploadItemService, getItemsService, getItemByIdService, deleteItemService, getFileByUrl } = require("../services/storage_services");

const getItems = async (req, res) => {
  try {
    const data = await getItemsService();
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: error.message });
  }
};

const uploadItem = async (req, res) => {
  try {
    const myFile = req.file;
    const result = await uploadItemService(myFile);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await getFileByUrl(_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try{
      const { _id } = req.params;
      const result = await deleteItemService(_id);
      res.status(200).json(`Item with ID ${_id} has been deleted`);
  } catch (error){
      res.status(500).send({error: error.message})
  }
};

module.exports = { uploadItem, getItems, getItem, deleteItem };
