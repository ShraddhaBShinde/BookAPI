require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

//Database import
const database = require("./booksdatabase");
//Models import
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");


//Initialize express
const booky = express(); //Creating instance of express
booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());

//ESTABLISH DATABASE CONNECTION
mongoose.connect(
    process.env.MONGO_URL
).then(() => console.log("Connection Established!!!"));

//GET ALL BOOKS
/*
Route          /
Description    GET ALL BOOKS
Access         Public
Parameters     -
Methods        GET
*/
booky.get("/", async(req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});
// GET A BOOK 
/*
Route          /
Description    GET A SPECIFIC BOOKS
Access         Public
Parameters     isbn
Methods        GET
*/
booky.get("/:isbn", async(req, res) => { //isbn is the parameter in route route
    const getabook = await BookModel.findOne({ ISBN: req.params.isbn })
    if (!getabook) {
        return res.json({
            error: `No book found for ISBN of ${req.params.isbn}`
        });
    }
    return res.json(getabook);
});

//GET A BOOK IN A SPECIFIC CATEGORY
/*
Route          /c
Description    GET A SPECIFIC BOOK BY CATEGORY
Access         Public
Parameters     category
Methods        GET
*/
booky.get("/c/:category", async(req, res) => { //category is the parameter in c route
    const getabookbycat = await BookModel.findOne({ category: req.params.category })
    if (!getabookbycat) {
        return res.json({
            error: `No book found for category of ${req.params.category}`
        });
    }
    return res.json(getabookbycat);
});

//GET A BOOK BY LANGUAGE
/*
Route          /l
Description    GET A SPECIFIC BOOK BY LANGUAGE
Access         Public
Parameters     language
Methods        GET
*/
booky.get("/l/:language", async(req, res) => {
    const getabookbylang = await BookModel.findOne({ language: req.params.language })
    if (!getabookbylang) {
        return res.json({
            error: `No book found for language of ${req.params.language}`
        });
    }
    return res.json(getabookbylang);
});

//GET ALL AUTHORS
/*
Route          /a/author
Description    GET ALL AUTHORS
Access         Public
Parameters     -
Methods        GET
*/
booky.get("/a/author", async(req, res) => {
    const getAllAuthors = await AuthorModel.find()
    return res.json(getAllAuthors);
});

//GET AN AUTHOR BASED ON A BOOK
/*
Route          /a/author
Description    GET AN AUTHOR BASED ON A BOOK
Access         Public
Parameters     book
Methods        GET
*/
booky.get("/a/author/:book", async(req, res) => {
    const getauthorbybook = await AuthorModel.findOne({ books: req.params.book })
    if (!getauthorbybook) {
        return res.json({
            error: `No author found for book of ${req.params.book}`
        });
    }
    return res.json(getauthorbybook);
});

//GET LIST OF AUTHORS BASED ON BOOKS
/*
Route          /a/author
Description    GET LIST OF AUTHORS BASED ON BOOKS
Access         Public
Parameters     book
Methods        GET
*/
booky.get("/a/author/b/:books", async(req, res) => {
    const getallauthorsbybook = await AuthorModel.find({ books: req.params.books })
    if (!getallauthorsbybook) {
        return res.json({
            error: `No authors found for book of ${req.params.books}`
        });
    }
    return res.json(getallauthorsbybook);
});

//GET ALL PUBLICATIONS
/*
Route          /p/publications
Description    GET ALL PUBLICATIONS
Access         Public
Parameters     -
Methods        GET
*/
booky.get("/p/publications", async(req, res) => {
    const getAllPubs = await PublicationModel.find()
    return res.json(getAllPubs);
});

//GET SPECIFIC PUBLICATION
/*
Route          /p/publications
Description    GET SPECIFIC PUBLICATION
Access         Public
Parameters     id
Methods        GET
*/
booky.get("/p/publications/:id", async(req, res) => {
    const getapub = await PublicationModel.findOne({ id: req.params.id })
    if (!getapub) {
        return res.json({
            error: `No publication found for id of ${req.params.id}`
        });
    }
    return res.json(getapub);
});

//GET LIST OF PUBLICATIONS BASED ON BOOKS
/*
Route          /p/publications/
Description    GET LIST OF PUBLICATIONS BASED ON BOOKS
Access         Public
Parameters     book
Methods        GET
*/
booky.get("/p/publications/b/:books", async(req, res) => {
    const getallpubsbybook = await PublicationModel.find({ books: req.params.books })
    if (!getallpubsbybook) {
        return res.json({
            error: `No publications found for book of ${req.params.books}`
        });
    }
    return res.json(getallpubsbybook);
});

//ADD NEW BOOKS
/*
Route          /book/new
Description    ADD NEW BOOKS
Access         Public
Parameters     NONE
Methods        POST
(without mongoose) booky.post("/book/new", (req, res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({ updatedBook: database.books });
});
*/
booky.post("/book/new", (req, res) => {
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook)
    return res.json({ books: addNewBook, message: "Book was added" });
});

//ADD NEW AUTHORS
/*
Route          /a/author/new
Description    ADD NEW AUTHORS
Access         Public
Parameters     NONE
Methods        POST
*/
booky.post("/a/author/new", (req, res) => {
    const { newAuthor } = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor)
    return res.json({ authors: addNewAuthor, message: "Author was added" });
});

//ADD NEW PUBLICATIONS
/*
Route          /p/publications/new
Description    ADD NEW PUBLICATIONS
Access         Public
Parameters     NONE
Methods        POST
*/
booky.post("/p/publications/new", (req, res) => {
    const { newPublication } = req.body;
    const addNewPublication = PublicationModel.create(newPublication)
    return res.json({ publications: addNewPublication, message: "Publication was added" });
});

//UPDATE A BOOK
/*
Route          /book/update
Description    UPDATE A BOOK
Access         Public
Parameters     isbn
Methods        PUT
*/
booky.put("/book/update/:isbn", async(req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        title: req.body.title
    }, {
        new: true
    });
    return res.json({ books: database.books });
});
//UPDATE A BOOK->AUTHOR (did not work)
/*
Route          /book/update
Description    UPDATE A BOOK
Access         Public
Parameters     isbn
Methods        PUT
*/
booky.put("/book/update/:isbn", async(req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        $push: {
            author: req.body.oneauthor
        }
    }, {
        new: true
    });
    return res.json({ books: database.books });
});
//UPDATE A BOOK->CATEGORY (did not work)
/*
Route          /book/update
Description    UPDATE A BOOK
Access         Public
Parameters     isbn
Methods        PUT
*/
booky.put("/book/update/:isbn", async(req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        $push: {
            category: parseInt(req.body.category)
        }
    }, {
        new: true
    });
    return res.json({ books: database.books });
});

//UPDATE PUBLICATION AND BOOK
/*
Route          /p/publications/update/book/
Description    UPDATE PUB AND BOOK
Access         Public
Parameters     isbn
Methods        PUT
*/
booky.put("/p/publications/update/book/:isbn", async(req, res) => {
    //UPDATE PUB Db
    /* (without mongoose) database.publications.forEach((pub) => {
         if (pub.id === req.body.pubId) {
             return pub.bookname.push(req.params.isbn);
         }
     })*/

    //UPDATE BOOK Db
    /* (without mongoose) database.books.forEach((book) => {
        if (book.ISBN == req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });*/
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        publication: req.body.pubId
    }, {
        new: true
    })
    return res.json({
        books: database.books,
        publications: database.publications,
        message: "Successfully updated!"
    });
});

//DELETE A BOOK
/*
Route          /delete/book
Description    DELETE A BOOK
Access         Public
Parameters     isbn
Methods        DELETE
*/
booky.delete("/book/delete/:isbn", async(req, res) => {
    const updateBookDatabase = await BookModel.findOneAndDelete({
        ISBN: req.params.isbn
    });
    return res.json({ books: updateBookDatabase });
});

//DELETE AN AUTHOR FROM A BOOK AND VICE VERSA
/*
Route          /delete/book/author
Description    DELETE A BOOK
Access         Public
Parameters     isbn,authorsId
Methods        DELETE
*/
booky.delete("/delete/book/author/:isbn/:authorId", async(req, res) => {
    //UPDATE BOOK Db
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        $pull: {
            author: req.params.authorId
        }
    }, {
        new: true
    });
    //UPDATE AUTHOR Db (did not work)
    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id: req.params.authorId
    }, {
        $pull: {
            books: req.params.isbn
        }
    }, {
        new: true
    });
    return res.json({
        book: database.books,
        author: database.authors,
        message: "Author and book were deleted!!!"
    });
});

booky.listen(3000, () => console.log("Server is up and running!")); //making it listen to port 3000