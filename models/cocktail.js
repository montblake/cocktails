// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
const cocktailSchema = new Schema({
    name: { type: String, required: true },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    description: String,
    method: String,
    glass: String,
    garnish: String,
    recipe: [{
        number: String,
        fraction: String,
        unit: String,
        ingredient: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient'
        }
    }],
    notes: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Cocktail'
    }
}, { timestamps: true });

// Turn Schema into Model, save to Variable
const Cocktail = mongoose.model('Cocktail', cocktailSchema);

// Make Model Available
module.exports = Cocktail;