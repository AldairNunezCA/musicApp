const { storageModel } = require("../models");

const publicUrl = process.env.PUBLIC_URL;

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

module.exports = { uploadItemService }