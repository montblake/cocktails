const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creatorSchema = new Schema({
    name: {type: String, required: true },
    about: String,
    cocktails: [ { type: Schema.Types.ObjectId, ref: 'Cocktail' }],
}, { timestamps: true });


//  Compile Schema into a Model
const Creator = mongoose.model('Creator', creatorSchema);

module.exports = Creator;