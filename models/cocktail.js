const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
    name: { type: String, required: true },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    description: String,
    method: String,
    glass: String,
    garnish: String,
    recipe: [{
        number: String,
        fraction: String,
        unit: String,
        ingredient: String,
    }],
    notes: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Cocktail'
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Cocktail'
    }]
}, { timestamps: true });

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;