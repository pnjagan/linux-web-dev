let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let cart = new Schema ({
  user_sess_id : Number,
  items: [{type: ObjectId, ref: 'SaleItem'}]
});

module.exports = mongoose.model('Cart',cart);
