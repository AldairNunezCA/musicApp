const { sequelize }= require('../../config/mysql')
const { DataTypes } = require('sequelize');
const Storage = require('./storage_models')

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
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        timestamps: true,
    }
)

Track.belongsTo(Storage, {
    foreignKey: 'mediaId',
    as: 'audio'
});

Track.findAllData = function () {
    return Track.findAll({ include: { model: Storage, as: 'audio' } });
};

Track.findOneData = function (id) {
    return Track.findOne({ where: { id }, include: { model: Storage, as: 'audio' } });
};

module.exports = Track;