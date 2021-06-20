// Dependencies
const express = require('express');
const ingredientsRouter = express.Router();
const Ingredient = require('../models/ingredient');
const Cocktail = require('../models/cocktail');


// ===============================
//          Routes
// ===============================
// Seed
// const ingredientSeed = require('../models/ingredientSeed');

// ingredientsRouter.get('/seed', (req, res) => {
//     Ingredient.deleteMany({}, (error, allIngredients) => {});
//     Ingredient.create(ingredientSeed, (error, data) => {
//         res.redirect('/ingredients');
//     });
// });




// Index
ingredientsRouter.get('/', async (req, res) => {
    try {
        const ingredients = await Ingredient.find({});
        res.render('ingredients/index.ejs', { ingredients, currentUser: req.session.currentUser });
    } catch(error) {
        console.log(error);
    }
});


// New
ingredientsRouter.get('/new', (req, res) => {
    res.render('ingredients/new.ejs', { currentUser: req.session.currentUser });
});


// Delete ALL
ingredientsRouter.delete('/', async (req, res) => {
    try {
        const ingredient = await Ingredient.deleteMany({});
        res.redirect('/ingredients');
    } catch(error) {
        console.log(error);
    } 
});

// Delete
ingredientsRouter.delete('/:id', async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndRemove(req.params.id);
        res.redirect('/ingredients');
    } catch(error) {
        console.log(error);
    }  
});


// Update
ingredientsRouter.put('/:id', async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/ingredients');
    } catch(error) {
        console.log(error); 
    }
});


// Create
ingredientsRouter.post('/', async (req, res) => {
    try {
        const ingredient = await Ingredient.create(req.body);
        res.redirect('/ingredients');
    } catch(error) {
        console.log(error);
    }
});


// Edit
ingredientsRouter.get('/:id/edit', async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        res.render('ingredients/edit.ejs', { ingredient, currentUser: req.session.currentUser });
    } catch(error) {
        console.log(error);
    }
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