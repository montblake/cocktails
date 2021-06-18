const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ingredientSchema = new Schema({
    name: { type: String, required: true },
    notes: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'Creator' }
}, { timestamps: true });

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
