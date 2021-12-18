const mongoose = require("mongoose");

//AUTHOR SCHEMA
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: [String],
    books: [String]
})

//CREATING AUTHOR MODEL
const AuthorModel = mongoose.model("authors", AuthorSchema);
module.exports = AuthorModel;