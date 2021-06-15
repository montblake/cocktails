// Dependencies
const express = require('express');
const router = express.Router();
const Author = require('../models/author');


// ===============================
// Define routes/controllers
// ===============================
// Index
router.get('/', (req, res) => {
    Author.find({}, (error, foundAuthors) => {
        res.render('authors/index.ejs', { authors: foundAuthors });
    });
});

// New
router.get('/new', (req, res) => {
    res.render('authors/new.ejs');
});

// Delete ALL
router.delete('/delete', (req, res) => {
    Author.deleteMany({}, (error, allAuthors) => {});
    res.redirect('/authors');
});

// Delete
router.delete('/:id', (req, res) => {
    Author.findByIdAndRemove(req.params.id, () => {
        res.redirect('/authors');
    });
});

// Update
router.put('/:id', (req, res) => {
    Author.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/authors');
    });
});

// Create
router.post('/', (req, res) => {
    Author.create(req.body, (error, createdAuthor) => {
        res.redirect('/authors');
    });
});

// Edit
router.get('/:id/edit', (req, res) => {
    Author.findById(req.params.id, (error, foundAuthor) => {
        res.render('authors/edit.ejs', {
            author: foundAuthor
        });
    });
});

// Show
router.get('/:id', (req, res) => {
    Author.findById(req.params.id, (error, foundAuthor) => {
        res.render('authors/show.ejs', { author: foundAuthor });
    });
});



module.exports = router;