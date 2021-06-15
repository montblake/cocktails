const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
    name: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    method: String,
    glass: String,
    garnish: String,
    recipe: [{
        measurement: String,
        fraction: String,
        unit: String,
        // ingredient could be a Model unto itself...
        ingredient: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient'
        }
    }],
    notes: String
}, { timestamps: true });

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;