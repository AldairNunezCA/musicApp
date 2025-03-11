const { matchedData } = require("express-validator");
const { registerUserService, loginUserService } = require("../services/auth_services");


const registerUser = async (req, res) => {
    try{
        const data = matchedData(req)
        const result = await registerUserService(data)
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try{
        const data = matchedData(req)
        const result = await loginUserService(data)
        res.status(200).send(result)
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
};

const loginGoogle = async (req, res) => {
    try{
        const { token, user } = req.user;
        res.status(200).send({ token, user });
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
}


module.exports = { registerUser, loginUser, loginGoogle };