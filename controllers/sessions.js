// Dependencies
const express = require('express');
// Require bcrypt for encrypting password
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const Person = require('../models/person');


// =========================================================
//                     ROUTES FOR SESSIONS ROUTER
// =========================================================

// New (login page)
sessionsRouter.get('/new', (req, res) => {
    res.render('sessions/new.ejs', { currentUser: req.session.currentUser });
});


// Delete (logout route)
sessionsRouter.delete('/', async (req, res) => {
    const session = await req.session.destroy();
    res.redirect('/');
});


// Create (login route)
sessionsRouter.post('/', async (req, res) => {
    // Check for an existing user
    const person = await Person.findOne({ email: req.body.email });
    // If no user found, send alert
    if (!foundUser) {
        res.send(`Oops! No user with that email address has been registered.`);
    } else {
        // If user has been found, 
        // Check if password entered (when hashed) matched hashed pw in database
        const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);

        // If passwords match:
        if (passwordMatches) {
            const currentId = foundUser._id;
            // Add user to session
            req.session.currentUser = foundUser;
            // Redirect user to their personal dashboard
            res.redirect(`/people/${currentId}`);
        } else {
            // Otherwise, inform them passwords don't match
            // TODO: develop feature to allow multiple attempts gracefully
            res.send('Oops! Invalid credentials.');
        }
    }
});


// ===============================================
//                 MODULE EXPORT
// ===============================================
module.exports = sessionsRouter;