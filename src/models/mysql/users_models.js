const { sequelize } = require('../../config/mysql')
const { DataTypes } = require ('sequelize')

const User = sequelize.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user"
    },
}, {
    timestamps: true
})

module.exports = User;