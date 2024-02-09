
const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true,
    });

const Book = model('Book', bookSchema);
module.exports = Book;