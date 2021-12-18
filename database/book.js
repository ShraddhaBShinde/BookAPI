const mongoose = require("mongoose");

//BOOK SCHEMA 
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    pubDate: String,
    numPages: Number,
    author: [Number],
    publication: Number,
    category: [String],
    language: [String]
});

//CREATING BOOK MODEL
const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;