// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');


// Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + 'is Mongo not running?'));
db.on('connected', () => console.log('Mongo connected'));
db.on('disconnected', () => console.log('Mongo disconnected'));


// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


// Controllers
const authorsController = require('./controllers/authors');
app.use('/authors', authorsController);
const cocktailsController = require('./controllers/cocktails');
app.use('/cocktails', cocktailsController);
const ingredientsController = require('./controllers/ingredients');
app.use('/ingredients', ingredientsController);

// Routes
app.get('/', (req, res) => {
    res.render('index.ejs');
});


// Listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Houston, we have contact on port ", port);
});
