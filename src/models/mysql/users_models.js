const { sequelize } = require('../../config/mysql')
const { DataTypes } = require ('sequelize')

const User = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    fbId: {
        type: DataTypes.STRING,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user"
    },
}, {
    timestamps: true
})


module.exports = User;