const { verifyToken } = require("../utils/handleJwt");
const usersModel = require('../models/nosql/users_models')

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ').pop();
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const dataToken = await verifyToken(token);
        if (!dataToken || !dataToken._id) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const user = await usersModel.findById(dataToken._id)
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { authMiddleware };
