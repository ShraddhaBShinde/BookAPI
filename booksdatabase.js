const books = [{
        ISBN: "Book100",
        title: "Getting started with MERN",
        pubDate: "2021-5-12",
        numPages: 300,
        author: [1],
        publication: [1],
        category: ["sci", "tech", "programming"],
        language: "English"

    },
    {
        ISBN: "Book101",
        title: "The Secret",
        pubDate: "2010-7-1",
        numPages: 224,
        author: [1],
        publication: [1],
        category: ["Self-help", "spiritual"],
        language: "Marathi"

    },
    {
        ISBN: "Book102",
        title: "400 Days",
        pubDate: "2021-8-10",
        numPages: 352,
        author: [1],
        publication: [1],
        category: ["Thriller", "Suspense"],
        language: "English"

    }

];

const authors = [{
        id: 1,
        name: ["Jack"],
        book: "Book100"
    },
    {
        id: 2,
        name: "Jill",
        book: ["Book1000", "Book1001"]
    },
    {
        id: 3,
        name: ["Rhonda Byrne"],
        book: "Book101"
    },
    {
        id: 4,
        name: ["Chetan-Bhagat"],
        book: "Book102"
    }
];

const publications = [{
        id: "001",
        name: "Poem Makers",
        bookname: "Book100",
    },
    {
        id: "002",
        name: "Friends Books",
        bookname: ["Book1000", "Book1001"]
    },
    {
        id: 2,
        name: "Manjul Publishing House",
        bookname: "Book101"
    },
    {
        id: 3,
        name: "Poem Makers 2",
        bookname: []
    },
    {
        id: 4,
        name: "Westland",
        bookname: "Book102"
    }
];

module.exports = { books, authors, publications };