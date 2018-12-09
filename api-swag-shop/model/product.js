var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
    title: String,
    price: Number,
    likes: {type: Number, default: 0},
    imgName: String,
    videoURL: String
});

module.exports = mongoose.model('Product', product);
