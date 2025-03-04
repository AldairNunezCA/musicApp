const { sequelize }= require('../../config/mysql')
const { DataTypes } = require('sequelize');

const Track = sequelize.define("tracks",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        album: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist_name: {
            type: DataTypes.STRING
        },
        artist_nationality: {
            type:DataTypes.STRING
        },
        duration_start: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        duration_end: {
            type: DataTypes.INTEGER
        },
        mediaId: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
    }
)
module.exports = Track;