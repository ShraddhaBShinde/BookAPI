const mongoose = require("mongoose");

//AUTHOR SCHEMA
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String]
})

//CREATING AUTHOR MODEL
const PublicationModel = mongoose.model("publications", PublicationSchema);
module.exports = PublicationModel;