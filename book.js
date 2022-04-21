const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ["Science Fiction", "Fantasy", "Romance", "Horror"]
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    review: {
        type: String,
        required: true
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;