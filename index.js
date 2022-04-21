const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Book = require('./models/book');
const res = require('express/lib/response');

main('Mongo connection open').catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/bookmoth')
        .then(() => {
            console.log("Mongo connection open")
        })
        .catch(err => {
            console.log("connection error")
            console.log(err)
        })
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



const genres = ['Science Fiction', 'Fantasy', 'Romance', 'Horror']
//home page route
app.get('/', (req, res) => {
    res.render("layouts/home")
})

//bookshelf route
app.get('/bookshelf', async (req, res) => {

    const books = await Book.find({})
    res.render('layouts/bookshelf', { books })
})

//BOOK ROUTES
app.get('/book/:id', async (req, res) => {
    const { id } = (req.params);
    const book = await Book.findById(id);
    res.render('layouts/show', { book })
})
//new book
app.get('/book/new', (req, res) => {
    res.render('layouts/new', { genres })
})

app.post('/bookshelf', async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    console.log(newBook)
    res.redirect(`/book/${newBook._id}`)
})
//edit book
app.get('/book/:id/edit', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render('layouts/edit', { book })
})

app.put('/book/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    await res.redirect(`/book/${book._id}`);
})
//delete book
app.delete('/book/:id', async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.redirect('/bookshelf');
})








app.listen(3000, () => {
    console.log("Listening on port 3000")
})


