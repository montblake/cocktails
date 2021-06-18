// Dependencies
const express = require('express');
const router = express.Router();
const Creator = require('../models/creator');
const Cocktail = require('../models/cocktail');
const Ingredient = require('../models/ingredient');
const sessionsRouter = require('./sessions.js');
const bcrypt = require('bcrypt');

// ===============================
// Define routes/controllers
// ===============================
// Index
router.get('/', (req, res) => {
    Creator.find({}, (error, foundCreators) => {
        res.render('creators/index.ejs', { creators: foundCreators, currentUser: req.session.currentUser });
    });
});

// New (REGISTRATION PAGE)
router.get('/new', (req, res) => {
    res.render('creators/new.ejs', { 
        currentUser: req.session.currentUser        
    });
});

// Delete ALL
router.delete('/', (req, res) => {
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

// Create (REGISTRATION ROUTE)
router.post('/', (req, res) => {
    console.log(req.body);
    // overwrite the user password with the hashed password, then pass that into our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));

    Creator.create(req.body, (error, creator) => {
        res.redirect('/');
    });
});


// Edit
router.get('/:id/edit', (req, res) => {
    Creator.findById(req.params.id, (error, foundCreator) => {
        res.render('creators/edit.ejs', {
            creator: foundCreator,
            currentUser: req.session.currentUser
        });
    });
});

// Show
router.get('/:id', async (req, res) => {
    try {
        const creator = await Creator.findById(req.params.id);
        const cocktails = await Cocktail.find({ createdBy: creator._id });
        res.render('creators/show.ejs', { creator, cocktails, currentUser: req.session.currentUser });
    } catch(error) {
        console.log(error);
    }
});


module.exports = router;