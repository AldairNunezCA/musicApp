const { tracksModel } = require('../models');
const { getItemsService } = require('../services/tracks_services');


const getItems = async (req, res) => {
    try {
        const data = await getItemsService();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({ error: 'Error fetching tracks'})
    }
}
const getItem = (req, res) => {};
const createItem = (req, res) => {};
const updateItem = (req, res) => {};
const deleteItem = (req, res) => {};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
