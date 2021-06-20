// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
const ingredientSchema = new Schema({
    name: { type: String, required: true },
    classificaton: String,
    notes: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'Person' }
}, { timestamps: true });

// Turn Schema into Model, save to Variable
const Ingredient = mongoose.model('Ingredient', ingredientSchema);

// Make Model Available
module.exports = Ingredient;
