const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
    name: String,
    method: String,
    glass: String,
    recipe: [{
        measurement: String,
        fraction: String,
        unit: String,
        ingredient: String
    }],
    garnish: String,
}, { timestamps: true });

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;