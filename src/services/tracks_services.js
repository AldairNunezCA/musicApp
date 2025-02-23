const { tracksModel } = require("../models");

const getItemsService = async () => {
  try {
    return await tracksModel.find({});
  } catch (error) {
    throw new Error("No items found");
    Ï;
  }
};

const createItemService = async (itemData) => {
  if (
    !itemData.name ||
    !itemData.album ||
    !itemData.cover ||
    !itemData.artist ||
    !itemData.duration ||
    !itemData.mediaId
  ) {
    throw new Error("Missing all the information");
  }
  try {
    return await tracksModel.create(itemData);
  } catch (error) {
    throw error;
  }
};

const getItemByIdService = async (id) => {
  try {
    foundId = await tracksModel.findOne({ _id: id });
    if (!foundId) {
      throw new Error(`ID ${id} not found`);
    } else {
      return foundId;
    }
  } catch (error) {
    throw error;
  }
};

const updateItemService = async (id, data) => {
  try {
    const foundId = await tracksModel.findOne({ _id: id });
    if (!foundId) {
      throw new Error(`ID ${id} not found`);
    }
    const allowedFields = [
      "name",
      "album",
      "cover",
      "artist",
      "duration",
      "mediaId",
    ];
    const invalidFields = Object.keys(data).filter((key) => {
      if (key.startsWith("artist.") || key.startsWith("duration."))
        return false;
      return !allowedFields.includes(key);
    });

    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(", ")}`);
    }

    const updatedTrack = await tracksModel.findOneAndUpdate(
      { _id: id },
      data,
      { new: true }
    );
    return updatedTrack;
  } catch (error) {
    throw error;
  }
};

const deleteItemService = async (id) => {
    try {
        const foundId = await tracksModel.findOne({ _id: id });
        if (!foundId) {
          throw new Error(`ID ${id} not found`);
        }
        return  await tracksModel.deleteOne({ _id: id});
    } catch (error){
        throw error;
    }
}

module.exports = {
  getItemsService,
  createItemService,
  getItemByIdService,
  updateItemService,
  deleteItemService
};
