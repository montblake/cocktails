// Dependencies
const express = require('express');
const peopleRouter = express.Router();
const Person = require('../models/people');
const Cocktail = require('../models/cocktail');
const Ingredient = require('../models/ingredient');
const sessionsRouter = require('./sessions.js');
const bcrypt = require('bcrypt');

// ===============================
// Define routes/controllers
// ===============================
// Index
peopleRouter.get('/', (req, res) => {
    Person.find({}, (error, people) => {
        res.render('people/index.ejs', { people, currentUser: req.session.currentUser });
    });
});

// New (REGISTRATION PAGE)
peopleRouter.get('/new', (req, res) => {
    res.render('people/new.ejs', { 
        currentUser: req.session.currentUser        
    });
});

// Delete ALL
peopleRouter.delete('/', (req, res) => {
    Person.deleteMany({}, (error, allPeople) => {});
    res.redirect('/people');
});

// Delete
peopleRouter.delete('/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id, () => {
        res.redirect('/people');
    });
});

// Update
peopleRouter.put('/:id', (req, res) => {
    Person.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/people');
    });
});

// Create (REGISTRATION ROUTE)
peopleRouter.post('/', (req, res) => {
    // overwrite the user password with the hashed password, then pass that into our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));

    Person.create(req.body, (error, person) => {
        res.redirect('/');
    });
});


// Edit
peopleRouter.get('/:id/edit', (req, res) => {
    Person.findById(req.params.id, (error, person) => {
        res.render('people/edit.ejs', {
            person,
            currentUser: req.session.currentUser
        });
    });
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