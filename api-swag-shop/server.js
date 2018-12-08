var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');

var Product = require('./model/product');
var WishList = require('./model/wishlist');

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT");
  next();
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/product', function(request, response) {
    var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;
    product.save(function(err, savedProduct) {
       if (err) {
           response.status(500).send({error:"Could not save product"});
       } else {
           response.send(savedProduct);
       }
    });
});

app.get('/product', function(request, response) {

    console.log('GET product request received');

    Product.find({},function(err, products) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(products);
        }
    });
});

app.get('/wishlist', function(request, response) {
   WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(err, wishLists) {
       if (err) {
           response.status(500).send({error:"Could not fetch wishlists"});
       } else {
           response.status(200).send(wishLists);
       }
   })
});

app.post('/wishlist', function(request, response) {

  console.log('POST request received');

    var wishList = new WishList();
    wishList.title = request.body.title;

    wishList.save(function(err, newWishList) {
       if (err) {
           response.status(500).send({error: "Could not create wishlist"});
       } else {
           response.send(newWishList);
       }
    });
});

app.post('/wishlist/delete', function(request, response) {

  console.log('POST request received');

    //var wishList = new WishList();

      WishList.findByIdAndRemove(
        request.body._id
        ,function(err, newWishList) {
           if (err) {
               response.status(500).send({error: "Could not delete wishlist"});
           } else {
               response.send(newWishList);
           }
         }
      );

    }
  );




function addProdsWL(wishListId ,prods , ind , request, response){

  WishList.update({_id:wishListId}, {$addToSet:{products: prods[ind]._id}},function(err,data){
    if(err){
      response.status(500).send('unable to save - error :'+err);
    }else{
      if(ind === prods.length-1){
        response.send('Products saved ');
      }else{
        addProdsWL(wishListId,prods,ind+1,request,response);
      }
    }

  });
}

function removeProdsWL(wishList ){

 for( let i = 0;i<wishList.products;i++ ){
   wishList.products.pull({ _id: wishList.products[i]._id });
 }


}

//Update wishlist from the server
app.post(
  '/wishlist/upd',
  function(request, response) {

    console.log('POST request received - WL '+request.body._id );
    let wid = request.body._id

    //var wishList = new WishList();

      // WishList.find({"_id" : wid} , function(err , wishList){
      //       console.log('Value from DB - WL '+ JSON.stringify(wishList) );
      // });

    WishList.findById(request.body._id , function(err , wishList){
      if(err){
        response.status(500).send({error: "unable to find the wish list to update"});
      }else{
        console.log('Value from DB - WL '+ JSON.stringify(wishList) );

        wishList.products = [];

        removeProdsWL(wishList )

         wishList.save(function(err,data){
           if(err){
              response.status(500).send({error: "unable to remove PRODS from the wish list"});
           }else{
             addProdsWL(wishList._id ,request.body.products , 0 , request, response);
           }
         }) ;


    }}
  );

});



app.put('/wishlist/product/add', function(request, response) {
   Product.findOne({_id: request.body.productId}, function(err, product) {
       if (err) {
           response.status(500).send({error:"Could not add item to wishlist"});
       } else {
           WishList.update({_id:request.body.wishListId}, {$addToSet:{products: product._id}}, function(err, wishList) {
               if (err) {
                   response.status(500).send({error:"Could not add item to wishlist"});
               } else {
                   response.send("Successfully added to wishlist");
               }
           });
       }
   })
});

app.listen(3004, function() {
    console.log("Swag Shop API running on port 3004...");
});
