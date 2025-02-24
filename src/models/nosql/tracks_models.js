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
module.exports = mongoose.model("tracks", TrackScheme);