// Dependencies
const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');
const Cocktail = require('../models/cocktail');


// ===============================
// Define routes/controllers
// ===============================
// Index
router.get('/', (req, res) => {
    Ingredient.find({}, (error, ingredients) => {
        res.render('ingredients/index.ejs', { ingredients, currentUser: req.session.currentUser });
    });
});

// New
router.get('/new', (req, res) => {
    res.render('ingredients/new.ejs', { currentUser: req.session.currentUser });
});

// Delete ALL
router.delete('/', (req, res) => {
    Ingredient.deleteMany({}, (error, allIngredients) => {});
    res.redirect('/ingredients');
});

// Delete
router.delete('/:id', (req, res) => {
    Ingredient.findByIdAndRemove(req.params.id, () => {
        res.redirect('/ingredients');
    });
});


// Update
router.put('/:id', (req, res) => {
    Ingredient.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/ingredients');
    });
});


// Create
router.post('/', (req, res) => {
    Ingredient.create(req.body, (error, ingredient) => {
        res.redirect('/ingredients');
    });
});


// Edit
router.get('/:id/edit', (req, res) => {
    Ingredient.findById(req.params.id, (error, ingredient) => {
        res.render('ingredients/edit.ejs', { ingredient, currentUser: req.session.currentUser });
    });
});


// Show
router.get('/:id', async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id).populate( 'createdBy' );
        const cocktails = await Cocktail.find({ 'recipe.ingredient': ingredient._id });
        res.render('ingredients/show.ejs', { ingredient, cocktails, currentUser: req.session.currentUser });
    } catch(error) {
        console.log(error);
    }
});


module.exports = router;