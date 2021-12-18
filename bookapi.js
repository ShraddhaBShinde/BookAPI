const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

//Database import
const database = require("./booksdatabase");


//Initialize express
const booky = express(); //Creating instance of express
booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json());

//ESTABLISH DATABASE CONNECTION
mongoose.connect(
    "mongodb+srv://ShraddhaBShinde:MongoDB@shapeai.clz3g.mongodb.net/Booky?retryWrites=true&w=majority"
).then(() => console.log("Connection Established!!!"));

//GET ALL BOOKS
/*
Route          /
Description    GET ALL BOOKS
Access         Public
Parameters     -
Methods        GET
*/
booky.get("/", (req, res) => {
    return res.json({ books: database.books });
    //key    //getting books
});
// GET A BOOK 
/*
Route          /
Description    GET A SPECIFIC BOOKS
Access         Public
Parameters     isbn
Methods        GET
*/
booky.get("/:isbn", (req, res) => { //isbn is the parameter in route route
    const getabook = database.books.filter((book) => book.ISBN === req.params.isbn);
    if (getabook.length === 0) {
        return res.json({
            error: `No book found for ISBN of ${req.params.isbn}`
        });
    }
    return res.json({ book: getabook });
});

//GET A BOOK IN A SPECIFIC CATEGORY
/*
Route          /c
Description    GET A SPECIFIC BOOK BY CATEGORY
Access         Public
Parameters     category
Methods        GET
*/
booky.get("/c/:category", (req, res) => { //category is the parameter in c route

    const getabookbycat = database.books.filter((book) =>
        book.category.includes(req.params.category)
        /*includes returns boolean values and it checks that if that array includes 
        the particular element*/
    );
    if (getabookbycat.length === 0) {
        return res.json({
            error: `No book found for category of ${req.params.category}`
        });
    }
    return res.json({ book: getabookbycat });
});

//GET A BOOK BY LANGUAGE
/*
Route          /l
Description    GET A SPECIFIC BOOK BY LANGUAGE
Access         Public
Parameters     language
Methods        GET
*/
booky.get("/l/:language", (req, res) => {
    const getabookbylang = database.books.filter((book) => book.language === req.params.language);
    if (getabookbylang.length === 0) {
        return res.json({
            error: `No book found for language of ${req.params.language}`
        });
    }
    return res.json({ book: getabookbylang });
});

//GET ALL AUTHORS
/*
Route          /a/author
Description    GET ALL AUTHORS
Access         Public
Parameters     -
Methods        GET
*/
booky.get("/a/author", (req, res) => {
    return res.json({ author: database.authors });
});

//GET AN AUTHOR BASED ON A BOOK
/*
Route          /a/author
Description    GET AN AUTHOR BASED ON A BOOK
Access         Public
Parameters     book
Methods        GET
*/
booky.get("/a/author/:book", (req, res) => {
    const getauthorbybook = database.authors.filter((author) =>
        author.book.includes(req.params.book));
    if (getauthorbybook.length === 0) {
        return res.json({
            error: `No author found for book of ${req.params.book}`
        });
    }
    return res.json({ author: getauthorbybook });
});

//GET LIST OF AUTHORS BASED ON BOOKS
/*
Route          /a/author
Description    GET LIST OF AUTHORS BASED ON BOOKS
Access         Public
Parameters     book
Methods        GET
*/
booky.get("/a/author/:book", (req, res) => {
    const getallauthorsbybook = database.authors.filter((author) =>
        author.book.includes(req.params.book));
    if (getallauthorsbybook.length === 0) {
        return res.json({
            error: `No author found for book of ${req.params.book}`
        });
    }
    return res.json({ author: getallauthorsbybook });
});

//GET ALL PUBLICATIONS
/*
Route          /p/publications
Description    GET ALL PUBLICATIONS
Access         Public
Parameters     -
Methods        GET
*/
booky.get("/p/publications", (req, res) => {
    return res.json({ publication: database.publications });
});

//GET SPECIFIC PUBLICATION
/*
Route          /p/publications
Description    GET SPECIFIC PUBLICATION
Access         Public
Parameters     id
Methods        GET
*/
booky.get("/p/publications/:id", (req, res) => {
    const getapub = database.publications.filter((publication) => publication.id === req.params.id);
    if (getapub.length === 0) {
        return res.json({
            error: `No publication found for id of ${req.params.id}`
        });
    }
    return res.json({ publication: getapub });
});

//GET LIST OF PUBLICATIONS BASED ON BOOKS
/*
Route          /p/publications/
Description    GET LIST OF PUBLICATIONS BASED ON BOOKS
Access         Public
Parameters     book
Methods        GET
*/
booky.get("/p/publications/b/:bookname", (req, res) => {
    const getallpubsbybook = database.publications.filter((book) =>
        publications.bookname.includes(req.params.bookname));
    if (getallpubsbybook.length === 0) {
        return res.json({
            error: `No publications found for book of ${req.params.bookname}`
        });
    }
    return res.json({ publications: getallpubsbybook });
});

//ADD NEW BOOKS
/*
Route          /book/new
Description    ADD NEW BOOKS
Access         Public
Parameters     NONE
Methods        POST
*/
booky.post("/book/new", (req, res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({ updatedBook: database.books });
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
    const newAuthor = req.body;
    database.authors.push(newAuthor);
    return res.json({ updatedAuthor: database.authors });
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
    const newPublication = req.body;
    database.publications.push(newPublication);
    return res.json({ updatedPublication: database.publications });
});

//UPDATE PUBLICATION AND BOOK
/*
Route          /p/publications/update/book/
Description    UPDATE PUB AND BOOK
Access         Public
Parameters     isbn
Methods        PUT
*/
booky.put("/p/publications/update/book/:isbn", (req, res) => {
    //UPDATE PUB Db
    database.publications.forEach((pub) => {
        if (pub.id === req.body.pubId) {
            return pub.bookname.push(req.params.isbn);
        }
    });
    //UPDATE BOOK Db
    database.books.forEach((book) => {
        if (book.ISBN == req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });
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
booky.delete("/book/delete/:isbn", (req, res) => {
    const updateBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);
    database.books = updateBookDatabase;
    return res.json({ books: database.books });
});

//DELETE AN AUTHOR FROM A BOOK AND VICE VERSA
/*
Route          /delete/book/author
Description    DELETE A BOOK
Access         Public
Parameters     isbn,authorsId
Methods        DELETE
*/
booky.delete("/delete/book/author/:isbn/:authorId", (req, res) => {
    //UPDATE BOOK Db
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        };
    });
    //UPDATE AUTHOR Db
    database.authors.forEach((eachAuthor) => {
        if (eachAuthor.id === req.params.authorId) {
            const newBookList = eachAuthor.book.filter(
                (book) => book !== req.params.isbn
            );
            eachAuthor.book = newBookList;
            return;
        };
    });
    return res.json({
        book: database.books,
        author: database.authors,
        message: "Author and book were deleted!!!"
    });
});

booky.listen(3000, () => console.log("Server is up and running!")); //making it listen to port 3000