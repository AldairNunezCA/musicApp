const bcryptjs = require ('bcryptjs')

const encrypt = async (passwordRegular) => {
    const hash = await bcryptjs.hash(passwordRegular, 10)
    return hash
};

const compare = async (passwordRegular, hashPassword) => {
    return await bcryptjs.compare(passwordRegular, hashPassword)
};

module.exports = {encrypt, compare}