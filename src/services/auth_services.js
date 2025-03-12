const { usersModel } = require("../models");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const ENGINE_DB = process.env.ENGINE_DB;

const registerUserService = async (data) => {
  try {
    let existingEmail;
    if (ENGINE_DB === "nosql") {
      existingEmail = await usersModel.findOne({ email: data.email });
    } else {
      existingEmail = await usersModel.findOne({
        where: { email: data.email },
      });
    }

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const passwordHashed = await encrypt(data.password);
    const body = { ...data, password: passwordHashed };

    let newUser;
    if (ENGINE_DB === "nosql") {
      newUser = await usersModel.create(body);
      newUser = newUser.toJSON();
    } else {
      newUser = await usersModel.create(body);
      newUser = newUser.get({ plain: true });
    }

    const { password, ...userWithoutPassword } = newUser;
    const tokenUser = {
      token: await tokenSign(newUser),
      user: userWithoutPassword,
    };
    return tokenUser;
  } catch (error) {
    throw error;
  }
};

const loginUserService = async (data) => {
  try {
    let user;
    if (ENGINE_DB === "nosql") {
      user = await usersModel
        .findOne({ email: data.email })
        .select("+password");
      if (user) user = user.toJSON();
    } else {
      user = await usersModel.findOne({ where: { email: data.email } });
      if (user) user = user.get({ plain: true });
    }

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const check = await compare(data.password, user.password);
    if (!check) {
      throw new Error("Invalid credentials");
    }

    const { password, ...userWithoutPassword } = user;
    const tokenUser = {
      token: await tokenSign(user),
      user: userWithoutPassword,
    };
    return tokenUser;
  } catch (error) {
    throw error;
  }
};

const loginThirdPartyService = async (data) => {
  try {
    let userFound;
    if (ENGINE_DB === "nosql") {
      userFound = await usersModel.findOne({ fbId: data.id });
      if (userFound) userFound = userFound.toJSON();
    } else {
      userFound = await usersModel.findOne({ where: { fbId: data.id } });
      if (userFound) userFound = userFound.get({ plain: true });
    }
    const tokenUser = {
      token: await tokenSign(userFound),
      user: userFound,
    };
    return tokenUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUserService,
  loginUserService,
  loginThirdPartyService,
};
