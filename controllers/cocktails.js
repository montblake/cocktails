const express = require('express');
const router = express.Router();
const Cocktail = require('../models/cocktail');
const Creator = require('../models/creator');
const Ingredient = require('../models/ingredient');

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
router.get('/new', async (req, res) => {
    const creators = await Creator.find({});
    const ingredients = await Ingredient.find({});
    res.render('cocktails/new.ejs', { creators, ingredients });
});


// Delete ALL
router.delete('/', (req, res) => {
    Cocktail.deleteMany({}, (error, allCocktails) => {});
    res.redirect('/cocktails');
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
    let num_lines = req.body.number.length;
    let recipe = [];
    for (let i = 0; i < num_lines; i++){
        let recipeLine = {};
        recipeLine.number = req.body.number[i];
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
    console.log(req.body);
    let num_lines = req.body.number.length;
    let recipe = [];
    for (let i = 0; i < num_lines; i++){
        let recipeLine = {};
        if (req.body.number[i] === '0'){
            recipeLine.number = '';
        } else {
            recipeLine.number = req.body.number[i];
        }
        recipeLine.fraction = req.body.fraction[i];
        recipeLine.unit = req.body.unit[i];
        recipeLine.ingredient = req.body.ingredient[i];
        recipe.push(recipeLine);
    }
    req.body.recipe = recipe;
    console.log(req.body);
    Cocktail.create(req.body, (error, createdCocktail) => {
        console.log(createdCocktail);
        res.redirect('/cocktails');
    });
});



// Create from FORK
router.post('/fork', (req, res) => {
    console.log(req.body);
    let num_lines = req.body.number.length;
    let recipe = [];
    for (let i = 0; i < num_lines; i++){
        let recipeLine = {};
        if (req.body.number[i] === '0'){
            recipeLine.number = '';
        } else {
            recipeLine.number = req.body.number[i];
        }
        recipeLine.fraction = req.body.fraction[i];
        recipeLine.unit = req.body.unit[i];
        recipeLine.ingredient = req.body.ingredient[i];
        recipe.push(recipeLine);
    }
    req.body.recipe = recipe;
    console.log(req.body);
    Cocktail.create(req.body, (error, createdCocktail) => {
        console.log(createdCocktail);
        res.redirect('/cocktails');
    });
});


// Edit
router.get('/:id/edit', async (req, res) => {
    const creators = await Creator.find({});
    const ingredients = await Ingredient.find({});
    const cocktail = await Cocktail.findById(req.params.id).populate('createdBy').populate('recipe.ingredient');
    res.render('cocktails/edit.ejs', { cocktail, creators, ingredients });

});

// FORK
router.get('/:id/fork', async (req, res) => {
    const creators = await Creator.find({});
    const ingredients = await Ingredient.find({});
    const cocktail = await Cocktail.findById(req.params.id).populate('createdBy').populate('recipe.ingredient');
    res.render('cocktails/fork.ejs', { cocktail, creators, ingredients });
});


// Show
router.get('/:id', async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id).populate('createdBy').populate('parent').populate('recipe.ingredient');
        const children = await Cocktail.find({ parent: req.params.id }).populate('children');
        console.log(children);
        res.render('cocktails/show.ejs', { cocktail, children });
    } catch (error) {
        console.log(error);
        res.redirect('/cocktails'); 
    }
});


// Export Module
module.exports = router;