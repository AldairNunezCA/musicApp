const mongoose = require('mongoose')

const TrackScheme = new mongoose.Schema(
    {
        name:{
            type: String
        },
        album:{
            type: Number
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
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("tracks", TrackScheme);