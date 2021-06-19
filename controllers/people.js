// Dependencies
const express = require('express');
const peopleRouter = express.Router();
const Person = require('../models/person');
const Cocktail = require('../models/cocktail');
const Ingredient = require('../models/ingredient');
const sessionsRouter = require('./sessions.js');
const bcrypt = require('bcrypt');

// ===============================
// Define routes/controllers
// ===============================
// Index
peopleRouter.get('/', async (req, res) => {
    const people = await Person.find({});
    res.render('people/index.ejs', { people, currentUser: req.session.currentUser });
});

// New (REGISTRATION PAGE)
peopleRouter.get('/new', (req, res) => {
    res.render('people/new.ejs', { currentUser: req.session.currentUser });
});

// Delete ALL
peopleRouter.delete('/', async (req, res) => {
    const person = await Person.deleteMany({});
    res.redirect('/people');
});

// Delete
peopleRouter.delete('/:id', async (req, res) => {
    const person = await Person.findByIdAndRemove(req.params.id);
    res.redirect('/people');
});

// Update
peopleRouter.put('/:id', async (req, res) => {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/people');
});

// Create (REGISTRATION ROUTE)
peopleRouter.post('/', async (req, res) => {
    try {
        // overwrite the user password with the hashed password, then pass that into our database
        req.body.password = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
        const person = await Person.create(req.body);
        res.redirect('/');
    } catch(error) {
        console.log(error);
    }   
});


// Edit
peopleRouter.get('/:id/edit', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        res.render('people/edit.ejs', { person, currentUser: req.session.currentUser });
    } catch(error) {
        console.log(error);
    }
});




// Show
peopleRouter.get('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        const cocktails = await Cocktail.find({ createdBy: person._id });
        res.render('people/show.ejs', { person, cocktails, currentUser: req.session.currentUser });
    } catch(error) {
        console.log(error);
    }
});

// Make ROuter available
module.exports = peopleRouter;