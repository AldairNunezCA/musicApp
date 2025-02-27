const { sequelize } = require('../../config/mysql')
const { DataTypes } = require ('sequelize')

const Storage = sequelize.define("storages",
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: true
    }
)

module.exports = Storage;