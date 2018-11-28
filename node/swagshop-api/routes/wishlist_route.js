let express = require('express');
let WishListModel = require('../model/wishlist.js');
let ProductModel = require('../model/product.js');

let wishlist_rt = express.Router();

wishlist_rt.get('/',function(req, res){

  WishListModel.find({}).populate({path:"products", model:'Product'}).exec(function(err,wishlists){
    if(err){
      res.status(500).send('unable to get the wishlist');
    }else{
      res.send(wishlists);
    }
  });

});

wishlist_rt.post('/create',function(req, res){

  if(req.body.title){
    let wishListModel = new WishListModel();
    wishListModel.title = req.body.title;
    wishListModel.save(function(err, savedWishlist){
      if(err){
        res.status(500).send('unable to save the wishlist');
      }else{
        res.send(savedWishlist);
      }
    });
  }else{
    res.status(500).send('need wname to create a wishlist');
  }

  WishListModel.find({},function(err,wishLists){
    if(err){
      res.status(500).send('unable to get wishlist');
    }else{
      res.send(wishLists);
    }

  });

}

);


wishlist_rt.put('/add',function(req, res){

  if(!req.body.title || !req.body.productID){
    res.status(500).send('Wishlist title and Prod ID is required to add an item to the wishlist');
  }else{
    WishListModel.findOne({title:req.body.title},function(err,wishList){
      if(err){
        res.status(500).send('unable to get wishlist for adding PRod');
      }else{
        ProductModel.findOne({_id:req.body.productID},function(err,product){
          wishList.products.push(req.body.productID);
          wishList.save(function(err,savedWishlist){
            res.send(savedWishlist);
          });

        });

      }

    });

  }



}
);



module.exports = wishlist_rt;
