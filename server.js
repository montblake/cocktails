// ==========================================
//              Dependencies 
// ==========================================
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Cocktail = require('./models/cocktail');
const e = require('express');

// ==========================================
//              Database 
// ==========================================
// Configuration
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

// Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + 'is Mongo not running?'));
db.on('connected', () => console.log('Mongo connected'));
db.on('disconnected', () => console.log('Mongo disconnected'));

// ==========================================
//              Middleware 
// ==========================================
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));




// ==========================================
//            Controllers & Routes 
// ==========================================
// Controllers

// Index
app.get('/cocktails', (req, res) => {
    Cocktail.find({}, (error, foundCocktails) => {
        res.render('index.ejs', { cocktails: foundCocktails });
    });
});

// New
app.get('/cocktails/new', (req, res) => {
    res.render('new.ejs');
});

// DeleteALL
app.delete('/cocktails', (req, res) => {
    Cocktail.deleteMany({}, (error, deletedCocktail) => {
        res.redirect('/cocktails');
    });
});

// Create
app.post('/cocktails', (req, res) => {
    console.log(req.body);
    let recipe = [];
    for (let i = 0; i < req.body.measurement.length; i++) {
        let recipeLine = {};
        if (req.body.measurement[i] === "0") {
            recipeLine.measurement = "";
        } else {
            recipeLine.measurement = req.body.measurement[i];
        }
        if (req.body.fraction[i] === "none") {
            recipeLine.fraction = "";
        } else {
            recipeLine.fraction = req.body.fraction[i];
        }
        recipeLine.unit = req.body.unit[i];
        recipeLine.ingredient = req.body.ingredient[i];
        recipe.push(recipeLine);
    }
    let name = req.body.name;
    req.body = {
        name: name,
        recipe: recipe
    }
    console.log(req.body);
    Cocktail.create(req.body, (error, createdCocktail) => {
        res.redirect('/cocktails');
    });
});

// Show
app.get('/cocktails/:id', (req, res) => {
    Cocktail.findById(req.params.id, (error, foundCocktail) => {
        console.log(foundCocktail);
        res.render('show.ejs', { cocktail: foundCocktail });
    });
});


// ==========================================
//              Listening 
// ==========================================
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Houston, we have contact: port', port);
});