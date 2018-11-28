let mongoose = require('mongoose'); //mongoose returns an Object

let Schema = mongoose.Schema; //schema returns a function that can be invoked with a new


let saleItem = new Schema(
{
    item_number: String,
    item_name: String,
    price: Number
}); // We can pass a collection name here

//mongoose will take the model name and use it to create a collection

module.exports = mongoose.model('SaleItem', saleItem);
