const {
  getItemsService,
  createItemService,
  getItemByIdService,
  updateItemService,
  deleteItemService
} = require("../services/tracks_services");

const getItems = async (req, res) => {
  try {
    const data = await getItemsService();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const data = req.body;
    const result = await createItemService(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await getItemByIdService(_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = req.body;
    const result = await updateItemService(_id, data);
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

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
