const mongoose = require("mongoose");

//PUBLICATION SCHEMA
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String]
})

//CREATING PUBLICATION MODEL
const PublicationModel = mongoose.model("publications", PublicationSchema);
module.exports = PublicationModel;