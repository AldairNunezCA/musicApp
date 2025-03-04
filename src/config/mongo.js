const mongoose = require('mongoose')

const dbConnectMongo =  async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        await mongoose.connection.dropDatabase();
        console.log('*****CONNECTION TO MONGO SUCCESFULL*****')
    } catch (error) {
        console.log('***** CONNECTION ERROR *****', error);
    }
}

module.exports = dbConnectMongo;