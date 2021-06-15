const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');

// ================================
// ROUTES
// ================================

// Index
router.get('/', (req, res) => {
    Ingredient.find({}, (error, ingredients) => {
        res.render('ingredients/index.ejs', { ingredients });
    }); 
});

// New
router.get('/new', (req, res) => {
    res.render('ingredients/new.ejs');
});

// Delete
router.delete('/:id', (req, res) => {
    Ingredient.findByIdAndDelete(req.params.id, (error, deletedIngredient) => {
        res.redirect('/ingredients');
    });
});

// Update
router.put('/:id', (req, res) => {
    Ingredient.findByIdAndUpdate(req.params.id, req.body, (error, updatedIngredient) => {
        res.redirect('/ingredients');
    });
});

// Create
router.post('/', (req, res) => {
    Ingredient.create(req.body, (error, createdIngredient) => {
        res.redirect('/ingredients');
    });
});

// Edit
router.get('/:id/edit', (req, res) => {
    Ingredient.findById(req.params.id, (error, foundIngredient) => {
        res.render('ingredients/edit.ejs', { ingredient: foundIngredient });
    });
});


// Show
router.get('/:id', async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        res.render('ingredients/show.ejs', { ingredient });
    } catch (error) {
        console.log(error);
        res.redirect('/ingredients'); 
    }
});


// Export Module
module.exports = router;