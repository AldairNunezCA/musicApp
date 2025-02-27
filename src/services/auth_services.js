const { usersModel } = require("../models");
const { encrypt, compare } = require("../utils/handlePassword")
const { tokenSign } = require('../utils/handleJwt')

const registerUserService = async (data) =>{
    try{
        const passwordHashed = await encrypt(data.password);
        const body = {...data, password: passwordHashed}
        const newUser = await usersModel.create(body);
        const { password, ...userWithoutPassword } = newUser.toJSON();
        const tokenUser = { token: await tokenSign(newUser), user: userWithoutPassword }        
        return tokenUser
    } catch (error) {
        throw error;
    }
};

const loginUserService = async (data) => {
    try{
        const user = await usersModel.findOne({ email: data.email})
        if(!user) {
            throw new Error('Invalid credentials')
        } 
        const hashPassword = user.password;
        const check = await compare(data.password, hashPassword)
        if (!check){
            throw new Error ('Invalid credentials')
        } else{
            const { password, ...userWithoutPassword} = user.toJSON();
            const tokenUser = {
                token: await tokenSign(user),
                user: userWithoutPassword
            }
            return tokenUser;    
        }
    } catch (error){
        throw error;
    }
}

module.exports = { registerUserService, loginUserService }