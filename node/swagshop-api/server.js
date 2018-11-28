let express = require('express');
let app = express();

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bodyParser = require('body-parser');
let db = mongoose.connect('mongodb://localhost/swag-shop', { useNewUrlParser: true });
//mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });

let cartRouter = require("./routes/cart_route");
let saleItemRouter = require("./routes/saleitem_route");
let wishlistRouter = require("./routes/wishlist_route");


if(!db){
  console.log('connection failed');
}else{
  console.log('connection success');
}

// Model object is a constructor function that can create a document and query objects from database
let ProductModel = require('./model/product.js');
let WishListModel = require('./model/wishlist.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use("/cart", cartRouter);
app.use("/saleitem", saleItemRouter);
app.use("/wishlist",wishlistRouter);


app.post('/product',function(req,res){

  if(!req.body.title){
    res.status(500).send('cannot create product with blank title');
  }else{
    let productDocument = new ProductModel();
    productDocument.title = req.body.title;
    productDocument.price = req.body.price;

    if(req.body.title === 'SriRama'){
      productDocument.mantra = 'Om Sriramaya namaH';
    }

    //console.log(' saving title :'+ productDocument.title );

    productDocument.save(function(err,savedProd){
      if(err){
          res.status(500).send({error:"Unable to save the product to database"})
      }else{
          res.send(savedProd);
      }
    });
  }//blank product
//  console.log( 'model is :'+ typeof ProductModel );
//  res.send('done');
});

app.get('/product',function(req,res){
  //res.send("not implemented");

  ProductModel.find({},
    function(err,prodList){
      if(err){
        res.status(500).send({error:"Could not fetch products"})
      }else{
        res.send(prodList)
      }
    }
  );

//  res.send('done');
});

console.log('OK , comes to here? 1');


/*
app.get('/about/owner',function(req,res){
  res.send('server owner');
  console.log('server owner');
  //console.log('OK , comes to here? 2');
})

app.get('/about/mentor',function(req,res){
  res.send('server mentor');
  console.log('server mentor');
  //console.log('OK , comes to here? 2');
})
*/


//is this urgent
app.listen(3000,function(){
  console.log('Swagship API running on port 3000');
});
