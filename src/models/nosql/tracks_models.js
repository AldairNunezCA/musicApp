const mongoose = require('mongoose')

const TrackScheme = new mongoose.Schema(
    {
        name:{
            type: String
        },
        album:{
            type: String
        },
        cover:{
            type: String,
            validate: {
                validator: (req)=> {
                    return true;
                }, 
                message: "URL ERROR"
            }
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

module.exports = mongoose.model("tracks", TrackScheme);