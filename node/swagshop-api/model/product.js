let mongoose = require('mongoose');
//mongoose returns an Object

let Schema = mongoose.Schema;
//schema returns a function that can be invoked with a new

let product = new Schema(
{
    title: String,
    price: Number,
    likes: {type: Number,default: 0},
    mantra: String
}); // We can pass a collection name here

module.exports = mongoose.model('Product', product);
//mongoose will take the model name and use it to create a collection
