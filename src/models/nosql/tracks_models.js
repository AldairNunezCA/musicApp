const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');

const TrackScheme = new mongoose.Schema(
    {
        name:{
            type: String
        },
        album:{
            type: String
        },
        cover:{
            type: String
        },
        artist:{
            name: {
                type: String,
            }, 
            nationality:{
                type: String
            },
        },
        duration:{
            start:{
                type: Number,
                default: 0
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            type: mongoose.SchemaTypes.ObjectId
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

TrackScheme.plugin(MongooseDelete, {overrideMethods: "all"})

TrackScheme.statics.findAllData = async function () {
    return await this.aggregate([
        {
            $lookup: {
                from: "storages",
                localField: "mediaId",
                foreignField: "_id",
                as: "audio"
            }
        },
        {
            $unwind: "$audio"
        }
    ]);
};

TrackScheme.statics.findOneData = async function (id) {
    return await this.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(String(id)) }
        },
        {
            $lookup: {
                from: "storages",
                localField: "mediaId",
                foreignField: "_id",
                as: "audio"
            }
        },
        {
            $unwind: "$audio"
        }
    ]);
};


module.exports = mongoose.model("tracks", TrackScheme);