const { usersModel } = require("../models");
const ENGINE_DB = process.env.ENGINE_DB;

const getUsersService = async () => {
  try {
    let users;
    if (ENGINE_DB === "nosql") {
      users = await usersModel.find({});
    } else {
      users = await usersModel.findAll();
    }

    if (!users || users.length === 0) {
      throw new Error("No users found");
    }
    return users;
  } catch (error) {
    throw error;
  }
};

const modifyUserService = async ( id, data ) => {
  try {
      let foundUser;
      if(ENGINE_DB === 'nosql') {
        foundUser = await usersModel.findOne({ _id: id })
      } else {
        foundUser = await usersModel.findOne({ where: { id }})
      }

      if (!foundUser) {
        throw new Error (`ID ${id} not found`);
      }

      const allowedFields = ["name", "age", "email"]
      const invalidFields = Object.keys(data).filter((key) =>{
        return !allowedFields.includes(key)
      })

      if (invalidFields.length > 0) {
        throw new Error(`Invalid fields: ${invalidFields.join(", ")}`);
      }

      let updatedUser;
      if (ENGINE_DB === 'nosql') {
        updatedUser = await usersModel.findOneAndUpdate({ _id: id}, data, {new: true});
      } else {
        await foundUser.update(data)
        updatedUser = await usersModel.findOne({ where: {id}})
      }

      return updatedUser;


  } catch (error) {
      throw error;
  }
};

const deleteUserService = async (id) => {
  try{
    let foundId; 
    if (ENGINE_DB === 'nosql'){
      foundId = await usersModel.findOne({ _id: id})
    } else {
      foundId = await usersModel.findOne({ where: {id}})
    }

    if (!foundId){
      throw new Error(`ID ${id} not found`);
    }

    let deleteResult;
    if (ENGINE_DB === 'nosql') {
      deleteResult = await usersModel.delete({ _id: id});
    } else {
      deleteResult = await usersModel.destroy({ where: {id}})
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {getUsersService, modifyUserService,deleteUserService}