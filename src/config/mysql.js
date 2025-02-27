const { Sequelize } = require("sequelize")

const db = process.env.MYSQL_DATABASE;
const user = process.env.MYSQL_USER;
const pass = process.env.MYSQL_PASS;
const hostSQL = process.env.MYSQL_HOST;


const sequelize = new Sequelize(db,user,pass,{
    host: hostSQL,
    dialect: 'mysql'
}
)

const dbConnectSQL = async() => {
    try{
        console.log(user)
        await sequelize.authenticate();
        console.log('MySQL connection succesfull')
    } catch (error) {
        console.log('MySQL connectione error', error)
    }
};

module.exports = {sequelize, dbConnectSQL}