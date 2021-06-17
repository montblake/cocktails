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
        res.render('ingredients/index.ejs', { ingredients });
    });
});

// New
router.get('/new', (req, res) => {
    res.render('ingredients/new.ejs');
});

// // Delete ALL
// router.delete('/', (req, res) => {
//     Creator.deleteMany({}, (error, allCreators) => {});
//     res.redirect('/creators');
// });

// // Delete
// router.delete('/:id', (req, res) => {
//     Creator.findByIdAndRemove(req.params.id, () => {
//         res.redirect('/creators');
//     });
// });

// // Update
// router.put('/:id', (req, res) => {
//     Creator.findByIdAndUpdate(req.params.id, req.body, () => {
//         res.redirect('/creators');
//     });
// });

// Create
router.post('/', (req, res) => {
    Ingredient.create(req.body, (error, ingredient) => {
        res.redirect('/ingredients');
    });
});

// // Edit
// router.get('/:id/edit', (req, res) => {
//     Creator.findById(req.params.id, (error, foundCreator) => {
//         res.render('creators/edit.ejs', {
//             creator: foundCreator
//         });
//     });
// });

// Show
router.get('/:id', async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        const cocktails = await Cocktail.find({ ingredient: ingredient._id });
        res.render('ingredients/show.ejs', { ingredient, cocktails });
    } catch(error) {
        console.log(error);
    }
});


module.exports = router;