let express = require('express');

let SaleItem = require('../model/saleitem.js');


let saleitem_rt = express.Router();

saleitem_rt.get('/',function(req,res){
  console.log('all sale items');

  SaleItem.find({} , function(err , saleitems){
    if(err){
      res.status(500).send('unable to get the sale items');
    }else{
      res.send(saleitems);
    }
  });


});

saleitem_rt.post('/create',function(req,res){

  let saleItem = new SaleItem();

  if(!req.body.item_number){
    res.status(500).send('item_number is required to create a cart');
  }else{

      saleItem.item_number = req.body.item_number;
      saleItem.item_name   = req.body.item_name;
      saleItem.price       = req.body.price;

      saleItem.save(function(err, savedSaleItem){
        if(err){
          res.status(500).send('Unable to save a saleItem');
        }else{
          res.send(savedSaleItem);
        }
      });
  }

});




saleitem_rt.delete('/remove',function(req,res){
  res.send('remove from cart not implemented');
});


module.exports = saleitem_rt;
