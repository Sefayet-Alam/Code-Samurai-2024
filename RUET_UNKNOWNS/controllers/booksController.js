const Book = require('../models/Book');
const selectedFields = 'id title author genre price';

exports.getBooksController = async (req, res) => {
    try {
        let query = {};
        let sort = {};

        // Search fields
        if (req.query.title) query.title = req.query.title;
        if (req.query.author) query.author = req.query.author;
        if (req.query.genre) query.genre = req.query.genre;

        // Sorting fields
        if (req.query.sort) {
            sort[req.query.sort] = req.query.order === 'DESC' ? -1 : 1;
        } else {
            sort['id'] = req.query.order === 'DESC' ? -1 : 1; // Default sort by ID in ascending order
        }

        const books = await Book.find(query)
            .select(selectedFields)
            .sort(sort);
        res.json({ books: books });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.getBookByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findOne({ id }).select(selectedFields);
        if (!book)
            return res.status(404).json({ message: `book with id: ${id} was not found` });
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

exports.addBookController = async (req, res) => {
    const { id, title, author, genre, price } = req.body;
    const book = new Book({ id, title, author, genre, price });
    try {
        const newBook = await book.save();

        // Send only the selected fields to the client


        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBookController = async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, price } = req.body;

    try {
        const book = await Book.findOne({ id }).select(selectedFields);

        if (!book)
            return res.status(404).json({ message: `book with id: ${id} was not found` });

        // If the field is not empty, update the field
        if (title) book.title = title;
        if (author) book.author = author;
        if (genre) book.genre = genre;
        if (price) book.price = price;

        const updatedBook = await book.save();
        // Filter the selected fields to return

        res.json(updatedBook);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
