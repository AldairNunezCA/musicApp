const {  GetObjectCommand } = require("@aws-sdk/client-s3");
const {s3} = require('../config/s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { storageModel } = require("../models");
const fs = require('fs')
const publicUrl = process.env.PUBLIC_URL;
const ENGINE_DB = process.env.ENGINE_DB;

const getItemsService = async () => {
  try {
    let storages;
    if (ENGINE_DB === 'nosql'){
      storages = await storageModel.find({})
    } else {
      storages = await storageModel.findAll();
    }

    if (!storages || storages.length === 0) {
      throw new Error ('No files found')
    }
    return storages;
  } catch (error) {
      throw error;
  }
};

const uploadItemService = async(myFile) => {
    if (!myFile) {
        throw new Error('Invalid file');
    }
    const filename = myFile.key.split('/').pop(); 
    const fileData = {
        filename: filename,
        url: myFile.location
    }
    try{
        return await storageModel.create(fileData);
    } catch (error){
        throw new Error ('Unable to upload to database')
    }
}

const getItemByIdService = async (id) => {
    try {
      let foundId;
      if (ENGINE_DB === 'nosql') {
        foundId = await storageModel.findOne({ _id: id})
      } else {
        foundId = await storageModel.findOne({ where: {id}})
      }
      if (!foundId) {
        throw new Error (`ID ${id} not found`);
      }

      return foundId;
    } catch (error) {
      throw error;
    }
  };

  const getFileByUrl = async (id) => {
    try{
      let foundId;
      if (ENGINE_DB === 'nosql') {
        foundId = await storageModel.findOne({ _id: id})
      }
      else {
        foundId = await storageModel.findOne({ where: {id}})
      }
      if (!foundId) {
        throw new Error (`ID ${id} not found`);
      }
      const { filename } = foundId;
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `tracks/${filename}`
      });
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
      console.log(signedUrl);
      return signedUrl;
    } catch (error) {
      throw error;
    }
  }

  const deleteItemService = async (id) => {
    try {
 
        let foundId;
        if (ENGINE_DB === 'nosql'){
          foundId = await storageModel.findOne({ _id: id})
        } else {
          foundId = await storageModel.findOne({ where: {id}})
        }
        if (!foundId) {
          throw new Error (`ID ${id} not found`);
      }
        const { filename } = foundId;
        const filePath = `${__dirname}/../storage/${filename}`
        fs.unlinkSync(filePath)
        let deleteResult;
        if(ENGINE_DB === 'nosql') {
          deleteResult = await storageModel.delete({ _id: id})
        } else {
          deleteResult = await storageModel.destroy({where: {id}})
        }
    } catch (error) {
        throw error;
    }
  }

module.exports = { uploadItemService, getItemsService, getFileByUrl, getItemByIdService, deleteItemService }