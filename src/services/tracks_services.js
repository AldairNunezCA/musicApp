const { tracksModel } = require('../models')

const getItemsService = async () => {
    return await tracksModel.find({})
}

module.exports = { getItemsService }