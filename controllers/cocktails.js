const express = require('express');
const router = express.Router();
const Cocktail = require('../models/cocktail');
const Author = require('../models/author');

// ================================
// ROUTES
// ================================

// Index
router.get('/', (req, res) => {
    
    Cocktail.find({}, (error, cocktails) => {
        res.render('cocktails/index.ejs', { cocktails });
    }); 
});

// New
router.get('/new', (req, res) => {
    Author.find({}, (error, authors) => {
        res.render('cocktails/new.ejs', { authors });
    });
});

// Delete
router.delete('/:id', (req, res) => {
    Cocktail.findByIdAndDelete(req.params.id, (error, deletedCocktail) => {
        res.redirect('/cocktails');
    });
});

// Update
router.put('/:id', (req, res) => {
    console.log(req.body);
    let num_lines = req.body.measurement.length;
    let recipe = [];
    for (let i = 0; i < num_lines; i++){
        let recipeLine = {};
        if (req.body.measurement[i] === '0'){
            recipeLine.measurement = '';
        } else {
            recipeLine.measurement = req.body.measurement[i];
        }
         
        recipeLine.fraction = req.body.fraction[i];
        recipeLine.unit = req.body.unit[i];
        recipeLine.ingredient = req.body.ingredient[i];
        recipe.push(recipeLine);
    }
    req.body.recipe = recipe;
    console.log(req.body);
    Cocktail.findByIdAndUpdate(req.params.id, req.body, (error, updatedCocktail) => {
        res.redirect('/cocktails');
    });
});

// Create
router.post('/', (req, res) => {
    let num_lines = req.body.measurement.length;
    let recipe = [];
    for (let i = 0; i < num_lines; i++){
        let recipeLine = {};
        if (req.body.measurement[i] === '0'){
            recipeLine.measurement = '';
        } else {
            recipeLine.measurement = req.body.measurement[i];
        }
         
        recipeLine.fraction = req.body.fraction[i];
        recipeLine.unit = req.body.unit[i];
        recipeLine.ingredient = req.body.ingredient[i];
        recipe.push(recipeLine);
    }
    req.body.recipe = recipe;
    Cocktail.create(req.body, (error, createdCocktail) => {
        console.log(createdCocktail);
        res.redirect('/cocktails');
    });
});

// Edit
router.get('/:id/edit', (req, res) => {
    
    Cocktail.findById(req.params.id, (error, cocktail) => {
        res.render('cocktails/edit.ejs', { cocktail });
    });
});


// Show
router.get('/:id', async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id).populate('createdBy');
        res.render('cocktails/show.ejs', { cocktail });
    } catch (error) {
        console.log(error);
        res.redirect('/cocktails'); 
    }
});


// Export Module
module.exports = router;