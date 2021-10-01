
const mongoose = require("mongoose");


const userScema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6
    },
    password:{
        type: String,
        required: true,
        max:1024
    },
    email:{
        type: String,
        required: true,
        min:8,
        max: 50
    },
    date:{
        type: Date,
        required: true,
        default: Date.now,
    },
    gender:{
        type: String,
    },
    PhotoURL:{
        type:String,
        max:50
    },
    phone:{
        type: Number,
    },
    location:{
        type: String,
        max: 100
    }
});
module.exports = mongoose.model('User',userScema,"users");

