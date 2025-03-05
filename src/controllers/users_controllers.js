const { getUsersService, modifyUserService } = require("../services/users_services");
const ENGINE_DB = process.env.ENGINE_DB;

const getUsers = async (req, res) => {
    try{
        const data = await getUsersService();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const modifyUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const data = req.body;
        
        if (ENGINE_DB === 'nosql'){
            if (req.user.role !== 'admin' && req.user._id.toString() !== _id) {
                return res.status(403).send({ error: "You don't have permission to modify this user" });
            }
        } else {
            if (req.user.role !== 'admin' && req.user.id.toString() !== _id) {
                return res.status(403).send({ error: "You don't have permission to modify this user" });
            }
        }

        const result = await modifyUserService(_id, data);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { getUsers, modifyUser }