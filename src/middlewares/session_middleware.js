const { verifyToken } = require("../utils/handleJwt");
const models = require('../models')
const getProperties = require('../utils/handleEngineProperty');
const { ObjectId } = require('mongodb')

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
            [propertiesKey.id]: propertiesKey.id === '_id' 
                ? new ObjectId(dataToken[propertiesKey.id])  
                : dataToken[propertiesKey.id]  
        };

        console.log("Este es el query:", query);


        const user = propertiesKey.id === '_id'
            ? await models.usersModel.findOne(query)
            : await models.usersModel.findOne({ where: query });


        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { authMiddleware };
