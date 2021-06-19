const express = require('express');
const cocktailsRouter = express.Router();
const Cocktail = require('../models/cocktail');
const Person = require('../models/person');
const Ingredient = require('../models/ingredient');


// ================================
//              ROUTES
// ================================

// Index
cocktailsRouter.get('/', async (req, res) => {   
    try {
        const cocktails = await Cocktail.find({});
        res.render('cocktails/index.ejs', { cocktails, currentUser: req.session.currentUser }); 
    } catch(error) {
        console.log(error);
    }
});


// New
cocktailsRouter.get('/new', async (req, res) => {
    try {
        const person = await Person.find({ _id: req.session.currentUser._id });
        const ingredients = await Ingredient.find({});
        res.render('cocktails/new.ejs', { person, ingredients, currentUser: req.session.currentUser });
    } catch(error) {
        console.log(error);
    }
});


// Delete ALL
cocktailsRouter.delete('/', async (req, res) => {
    try {
        const cocktail = await Cocktail.deleteMany({});
        res.redirect('/cocktails');
    } catch(error) {
        console.log(error);
    }
}); 


// Delete
cocktailsRouter.delete('/:id', async (req, res) => {
    try {
        const cocktail = await Cocktail.findByIdAndDelete(req.params.id);
        res.redirect('/cocktails');
    } catch(error) {
        console.log(error);
    }
});


// Update
cocktailsRouter.put('/:id', async (req, res) => {
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
    try {
        const cocktail = await Cocktail.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/cocktails');
    } catch(error) {
        console.log(error);
    }
});


// Create
cocktailsRouter.post('/', async (req, res) => {
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
    try {
        const cocktail = await Cocktail.create(req.body);
        res.redirect('/cocktails');
    } catch(error) {
        console.log(error);
    }
});


// Create from FORK
cocktailsRouter.post('/fork', (req, res) => {
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
    Cocktail.create(req.body, (error, createdCocktail) => {
        res.redirect('/cocktails');
    });
});


// Edit
cocktailsRouter.get('/:id/edit', async (req, res) => {
    try {
        const ingredients = await Ingredient.find({});
        const cocktail = await Cocktail.findById(req.params.id).populate('createdBy').populate('recipe.ingredient');
        res.render('cocktails/edit.ejs', { cocktail, ingredients, currentUser: req.session.currentUser });
    } catch(error) {
        console.log(error);
    }
});

// FORK
cocktailsRouter.get('/:id/fork', async (req, res) => {
    try {
        const ingredients = await Ingredient.find({});
        const cocktail = await Cocktail.findById(req.params.id).populate('createdBy').populate('recipe.ingredient');
        res.render('cocktails/fork.ejs', { cocktail, ingredients, currentUser: req.session.currentUser });
    } catch(error) {
        console.log(error);
    }
});


// Show
cocktailsRouter.get('/:id', async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id).populate('createdBy').populate('parent').populate('recipe.ingredient');
        const children = await Cocktail.find({ parent: req.params.id }).populate('children');
        res.render('cocktails/show.ejs', { cocktail, children, currentUser: req.session.currentUser });
    } catch (error) {
        console.log(error);
        res.redirect('/cocktails'); 
    }
});

// ===============================================
//                 MODULE EXPORT
// ===============================================
module.exports = cocktailsRouter;