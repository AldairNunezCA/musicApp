const { Sequelize } = require("sequelize");

const db = process.env.MYSQL_DATABASE;
const user = process.env.MYSQL_USER;
const pass = process.env.MYSQL_PASS;
const hostSQL = process.env.MYSQL_HOST;


const sequelize = new Sequelize(db,user,pass,{
    host: hostSQL,
    dialect: 'mysql',
    logging: false
}
)

const dbConnectSQL = async() => {
    try{
        await sequelize.authenticate();
        await sequelize.sync({ force: true})
        console.log('tablas creadas')
        console.log('✅ MySQL connection successful')
    } catch (error) {
        console.log('❌ MySQL connectione error', error);
        process.exit(1);
    }
};

module.exports = {sequelize, dbConnectSQL}