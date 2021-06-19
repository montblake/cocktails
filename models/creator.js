// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
const creatorSchema = new Schema({
    name: {type: String, required: true },
    email: {type: String, required: true },
    password: {type: String, required: true }, 
    about: String,
    cocktails: [ { type: Schema.Types.ObjectId, ref: 'Cocktail' }],
}, { timestamps: true });


//  Turn Schema into a Model
const Creator = mongoose.model('Creator', creatorSchema);

// Make Model Available
module.exports = Creator;