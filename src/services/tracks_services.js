const { tracksModel } = require("../models");
const ENGINE_DB = process.env.ENGINE_DB;

const getItemsService = async () => {
  try {
     const items = await tracksModel.findAllData();
    if (!items || items.length === 0) {
      throw new Error("No items found");
    }
    return items;
  } catch (error) {
    throw error;
  }
};

const createItemService = async (itemData) => {
  try {
    if (ENGINE_DB === 'nosql') {
      return await tracksModel.create(itemData);
    } else {
      const {artist, duration, ...restOfData} = itemData;
      const itemDataFlat = {
        ...restOfData,
        artist_name: artist.name,
        artist_nationality: artist.nationality,
        duration_start: duration.start,
        duration_end: duration.end
      };
      return await tracksModel.create(itemDataFlat);
    }
  } catch (error) {
    throw error;
  }
};

const getItemByIdService = async (id) => {
  try {
      const foundId = await tracksModel.findOneData(id);
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
    let foundItem;
    if (ENGINE_DB === "nosql") {
      foundItem = await tracksModel.findOne({ _id: id });
    } else {
      foundItem = await tracksModel.findOnData({ where: { id } });
    }

    if (!foundItem) {
      throw new Error(`ID ${id} not found`);
    }

  

    const allowedFields = ["name", "album", "cover", "artist", "duration", "mediaId"];
    const invalidFields = Object.keys(data).filter((key) => {
      if (key.startsWith("artist.") || key.startsWith("duration.")) return false;
      return !allowedFields.includes(key);
    });

    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(", ")}`);
    }

    if (ENGINE_DB === "mysql") {
      const convertedData = {};
      for (const key in data) {
        const newKey = key.replace(/\./g, "_");
        convertedData[newKey] = data[key];
      }
      data = convertedData;
    }
  
    let updatedTrack;
    if (ENGINE_DB === "nosql") {
      updatedTrack = await tracksModel.findOneAndUpdate({ _id: id }, data, { new: true });
    } else {
      await foundItem.update(data);
      updatedTrack = await tracksModel.findOne({ where: { id } });
    }

    return updatedTrack;
  } catch (error) {
    throw error;
  }
};

const deleteItemService = async (id) => {
  try {
      let foundId;
      if (ENGINE_DB === 'nosql') {
          foundId = await tracksModel.findOne({ _id: id });
      } else {
          foundId = await tracksModel.findOne({ where: { id } });
      }

      if (!foundId) {
          throw new Error(`ID ${id} not found`);
      }

      let deleteResult;
      if (ENGINE_DB === 'nosql') {
          deleteResult = await tracksModel.delete({ _id: id});
      } else {
          deleteResult = await tracksModel.destroy({ where: { id } });
      }

      return deleteResult;
  } catch (error) {
      throw error;
  }
};

module.exports = {
  getItemsService,
  createItemService,
  getItemByIdService,
  updateItemService,
  deleteItemService
};
