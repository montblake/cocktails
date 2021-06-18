// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');


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
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
}));


// Controllers
const creatorsController = require('./controllers/creators');
app.use('/creators', creatorsController);
const cocktailsController = require('./controllers/cocktails');
app.use('/cocktails', cocktailsController);
const ingredientsController = require('./controllers/ingredients');
app.use('/ingredients', ingredientsController);
const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);

// Routes
app.get('/', (req, res) => {
    if (req.session.currentUser) {
        res.render('dashboard.ejs', {
            currentUser: req.session.currentUser
        });
    } else {
        res.render('index.ejs', {
            currentUser: req.session.currentUser
        });
    }
});

// Listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Houston, we have contact on port", port);
});
