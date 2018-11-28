let express = require('express');

let app = express();

let bodyParser = require("body-parser");

//more important when posting
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended:false
}));


let ingredients = [
  {
    "id":"1000",
    "text":"jaggery"
  },
  {
    "id":"1001",
    "text":"water"
  },
  {
    "id":"1002",
    "text":"cardomom"
  },
  {
    "id":"1003",
    "text":"dry ginger"
  },
  {
    "id":"1004",
    "text":"clove"
  }
];

app.get('/ingredient',function(req,res){
  res.type('application/json');
  res.send(ingredients);
});

app.post('/ingredient',function(req,res){
  let ingredient = req.body;
  if(!ingredient || ingredient.text ==="" ){
    res.status(500).send('your ingredient must have a text');
  }else {
    ingredients.push(ingredient);
    res.type('json');
    res.status(200).send(ingredients);
  }
  //res.send(ingredients);
});

app.put('/ingredient/:ingId',function(req,res){
  let ingId = req.params.ingId;
  let ingText = req.body.text; //take the text in body
  console.log('ingText :'+ingText);

  if(ingText!=='' && ingText){
    let ingFound = false;
    for(let i = 0 ; i< ingredients.length;i++){
      if(ingId == ingredients[i].id){
        ingredients[i].text = ingText;
        ingFound =true;
        break;
      }
    }

    if(ingFound){
      res.send(ingredients);
    }else{
      res.status(500).send('Ingredient not found');
    }
    //res.send(ing);
  }else{
    res.status(500).send({error:'You must send a text to update and Id with'});
  }


});


app.delete('/ingredient/:ingId',function(req,res){
  let ingId = req.params.ingId;
  //let ingText = req.body.text; //take the text in body
  //no text required for delete

  //console.log('ingText :'+ingText);

  //if(ingText!=='' && ingText){
    let ingFound = false;
    for(let i = 0 ; i< ingredients.length;i++){
      if(ingId == ingredients[i].id){
        ingredients.splice(i,1);
        //ingredients[i].text = ingText;
        ingFound =true;
        break;
      }
    }

    if(ingFound){
      res.send(ingredients);
    }else{
      res.status(500).send('Ingredient not found');
    }



});

// app.get('/rama',function(req,res){
//   res.send('Hare rama!');
// });

app.listen(3000,function(){console.log('running');});
