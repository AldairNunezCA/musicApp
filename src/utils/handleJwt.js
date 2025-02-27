const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require('../utils/handleEngineProperty')
const propertiesKey = getProperties();

const tokenSign = async (user) => {
    const sign = await jwt.sign(
        {
            [propertiesKey.id]: user[propertiesKey.id],
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
    return sign;
};

const verifyToken = async (tokenJWT) => {
    try{
        return jwt.verify(tokenJWT, JWT_SECRET)
    } catch (error) {
        return null
    }
};

module.exports = {tokenSign, verifyToken};