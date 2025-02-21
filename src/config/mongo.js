const mongoose = require('mongoose')

const dbConnect =  async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('*****CONNECTION SUCCESFULL*****')
    } catch (error) {
        console.log('***** CONNECTION ERROR *****', error);
    }
}

module.exports = dbConnect;