let express = require('express');

let Cart = require('../model/cart.js');
let SaleItem = require('../model/saleitem.js');

/*
Able to create , add and remove CART
*/


let cart_rt = express.Router();

cart_rt.get('/',function(req,res){
  console.log('this is cart');

  Cart.find({} , function(err , carts){
    if(err){
      res.status(500).send('unable to get the cart items');
    }else{
      res.send(carts);
    }
  });


});

cart_rt.post('/create',function(req,res){

  let cart = new Cart();

  if(!req.body.user_sess_id){
    res.status(500).send('user sess id is required to create a cart');
  }
  cart.user_sess_id = req.body.user_sess_id;

  cart.save(function(err, savedCart){
    if(err){
      res.status(500).send('Unable to create a cart');
    }else{
      res.send(savedCart);
    }
  });

});


cart_rt.put('/add',function(req,res){


  if(!req.body.user_sess_id
   ||
   !req.body.item_number
  ){

    res.status(500).send('user sess id and Item num is required to add to a cart');
 }else{
   //somehow find a cart and add an item to it
   SaleItem.findOne({"item_number":req.body.item_number},function(err,si){
     console.log(si);
     if(err){
       res.status(500).send('unable to find cart item to be added');
     }else{
       Cart.findOne({"user_sess_id" : req.body.user_sess_id} , function(err , carts){
         if(err){
           res.status(500).send('unable to get the cart');
         }else{

           //do some cleanup , remove NULLs
            if(carts.items !== null){
              carts.items =   carts.items.filter(function(obj){ return (obj!== null);});

            }
           //
           carts.items.push(si);
           carts.save(function(err,savedCart){
             if(err){
               res.status(500).send('unabel to save cart');
             }else{
               res.send(savedCart);
             }
           });

         }
       });
     }
   });



   //res.send('still figuring how to find a cart and add an item to it');
 }//param not null


});


cart_rt.delete('/remove',function(req,res){
  if(
  !req.body.user_sess_id
   ||
  !req.body.item_number ){
    res.status(500).send('valid user session and item to be sent for removing from Cart');
  }else{
    Cart.findOne(
      function(err,cart){
        if(err || !cart){
          res.status(500).send('unable to get the cart');
        }else{

          SaleItem.findOne({"item_number":req.body.item_number},function(err,si){

            if(err){
              res.status(500).send('unable to get the item');
            }else{
              console.log('Looping to find the items');
              console.log('Looping to find the items' + si._id );
              for(let i = 0 ; i<cart.items.length;i++ ){

                console.log(' compare with :'+cart.items[i]._id);
                if(si._id.equals(cart.items[i]._id)){

                  console.log('do a splice');
                  cart.items.splice(i,1);
                  break;
                }
              }
              cart.save(function(err,savedCart){
                if(err){
                  res.status(500).send('unable to save the cart');
                }else{
                  res.send(savedCart);
                }
              });
            }
          });
        //cart is valid
        }
      }
    );

  }

});


module.exports = cart_rt;
