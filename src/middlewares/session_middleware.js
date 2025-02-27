const { verifyToken } = require("../utils/handleJwt");
const models = require('../models')
const getProperties = require('../utils/handleEngineProperty');
const { where } = require("sequelize");

const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ').pop();
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const dataToken = await verifyToken(token);
        if (!dataToken) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        };

        console.log("este es el query ", query);


        const user = (propertiesKey === 'nosql')
            ? await models.usersModel.findOne(query)
            : await models.usersModel.findOne({where: query})
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { authMiddleware };
