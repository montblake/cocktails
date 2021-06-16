const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {type: String, required: true },
    about: String,
    cocktails: [ { type: Schema.Types.ObjectId }],
}, { timestamps: true });


//  Compile Schema into a Model
const Author = mongoose.model('Author', authorSchema);

module.exports = Author;