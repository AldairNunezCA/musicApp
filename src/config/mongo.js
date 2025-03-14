const mongoose = require('mongoose')

const dbConnectMongo =  async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        await mongoose.connection.dropDatabase();
        console.log('✅ MongoDB connection successful')
    } catch (error) {
        console.log('❌ MongoDB connection error', error);
    }
}

module.exports = dbConnectMongo;