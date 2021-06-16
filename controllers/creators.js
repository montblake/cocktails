// Dependencies
const express = require('express');
const router = express.Router();
const Creator = require('../models/creator');


// ===============================
// Define routes/controllers
// ===============================
// Index
router.get('/', (req, res) => {
    Creator.find({}, (error, foundCreators) => {
        res.render('creators/index.ejs', { creators: foundCreators });
    });
});

// New
router.get('/new', (req, res) => {
    res.render('creators/new.ejs');
});

// Delete ALL
router.delete('/delete', (req, res) => {
    Creator.deleteMany({}, (error, allCreators) => {});
    res.redirect('/creators');
});

// Delete
router.delete('/:id', (req, res) => {
    Creator.findByIdAndRemove(req.params.id, () => {
        res.redirect('/creators');
    });
});

// Update
router.put('/:id', (req, res) => {
    Creator.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/creators');
    });
});

// Create
router.post('/', (req, res) => {
    Creator.create(req.body, (error, createdCreator) => {
        res.redirect('/creators');
    });
});

// Edit
router.get('/:id/edit', (req, res) => {
    Creator.findById(req.params.id, (error, foundCreator) => {
        res.render('creators/edit.ejs', {
            creator: foundCreator
        });
    });
});

// Show
router.get('/:id', (req, res) => {
    Creator.findById(req.params.id, (error, foundCreator) => {
        res.render('creators/show.ejs', { creator: foundCreator });
    });
});



module.exports = router;