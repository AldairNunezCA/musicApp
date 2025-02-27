const { storageModel } = require("../models");
const fs = require('fs')
const publicUrl = process.env.PUBLIC_URL;

const getItemsService = async () => {
  try {
    console.log("SM storageModel", storageModel)
      const items = await storageModel.findAll();
      if (!items || items.length === 0) {
          return []; // Devuelve un array vacío en lugar de lanzar un error
      }
      return items;
  } catch (error) {
      throw new Error("Database query failed");
  }
};

const uploadItemService = async(myFile) => {
    if (!myFile || !myFile.filename) {
        throw new Error('Invalid file');
    }
    const { filename } = myFile;
    const fileData = {
        filename: filename,
        url: `${publicUrl}${filename}`
    }
    try{
        return await storageModel.create(fileData);
    } catch (error){
        throw new Error ('Unable to upload to database')
    }
}

const getItemByIdService = async (id) => {
    try {
      foundId = await storageModel.findOne({ _id: id });
      if (!foundId) {
        throw new Error(`ID ${id} not found`);
      } else {
        return foundId;
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteItemService = async (id) => {
    try {
        foundId = await storageModel.findOne({ _id: id });
        if (!foundId) {
            throw new Error (`ID ${id} not found`);
        }
        const { filename } = foundId;
        const filePath = `${__dirname}/../storage/${filename}`
        fs.unlinkSync(filePath)
        return await storageModel.delete({ _id: id })
    } catch (error) {
        throw error;
    }
  }

module.exports = { uploadItemService, getItemsService, getItemByIdService, deleteItemService }