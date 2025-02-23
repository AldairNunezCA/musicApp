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
    const { id } = req.params;
    const result = await getItemByIdService(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateItemService(id, data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await deleteItemService(id);
        res.status(200).json(`Item with ID ${id} has been deleted`);
    } catch (error){
        res.status(500).send({error: error.message})
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
