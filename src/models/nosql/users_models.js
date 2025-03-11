const mongoose = require('mongoose')
const MongooseDelete = require('mongoose-delete');

const UserScheme = new mongoose.Schema(
    {
        name:{
            type: String
        },
        age:{
            type: Number
        },
        email:{
            type: String,
            unique: true
        },
        password:{
            type: String,
            select: false
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);


UserScheme.plugin(MongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("users", UserScheme);