const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: String,
    // origin = purchased or housemade
    origin: String,
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
}, { timestamps: true });

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;