const { matchedData } = require("express-validator");
const { registerUserService, loginUserService, loginThirdPartyService } = require("../services/auth_services");


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
};

const loginFacebook = async (req, res) => {
    try{
        res.redirect('/api/v1/auth/login/facebook/success');
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
};

const loginFacebookSuccess = async (req, res) => {
    try{
        const data = {
            id: req.session.passport.user.id,
        }

        const result = await loginThirdPartyService(data)
        console.log(result);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(401).send({ error: error.message });
    }
};


module.exports = { registerUser, loginUser, loginGoogle, loginFacebook, loginFacebookSuccess };