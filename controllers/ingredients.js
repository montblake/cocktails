// Dependencies
const express = require('express');
const ingredientsRouter = express.Router();
const Ingredient = require('../models/ingredient');
const Cocktail = require('../models/cocktail');


// ===============================
//          Routes
// ===============================
// Index
ingredientsRouter.get('/', (req, res) => {
    Ingredient.find({}, (error, ingredients) => {
        res.render('ingredients/index.ejs', { ingredients, currentUser: req.session.currentUser });
    });
});

// New
ingredientsRouter.get('/new', (req, res) => {
    res.render('ingredients/new.ejs', { currentUser: req.session.currentUser });
});

// Delete ALL
ingredientsRouter.delete('/', (req, res) => {
    Ingredient.deleteMany({}, (error, allIngredients) => {});
    res.redirect('/ingredients');
});

// Delete
ingredientsRouter.delete('/:id', (req, res) => {
    Ingredient.findByIdAndRemove(req.params.id, () => {
        res.redirect('/ingredients');
    });
});


// Update
ingredientsRouter.put('/:id', (req, res) => {
    Ingredient.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/ingredients');
    });
});


// Create
ingredientsRouter.post('/', (req, res) => {
    Ingredient.create(req.body, (error, ingredient) => {
        res.redirect('/ingredients');
    });
});


// Edit
ingredientsRouter.get('/:id/edit', (req, res) => {
    Ingredient.findById(req.params.id, (error, ingredient) => {
        res.render('ingredients/edit.ejs', { ingredient, currentUser: req.session.currentUser });
    });
});


// Show
ingredientsRouter.get('/:id', async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id).populate( 'createdBy' );
        const cocktails = await Cocktail.find({ 'recipe.ingredient': ingredient._id });
        res.render('ingredients/show.ejs', { ingredient, cocktails, currentUser: req.session.currentUser });
    } catch(error) {
        console.log(error);
    }
});

// Make Router Available
module.exports = ingredientsRouter;