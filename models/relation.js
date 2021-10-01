const mongoose = require("mongoose");

const relationScema = new mongoose.Schema({
    vertex1:String,
    vertex2: String
});
module.exports = mongoose.model("Relation",relationScema,"relations");