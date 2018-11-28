db.products.find({"title" : {$exists :true}});


 db.qtest.insertMany([
 {nama: "krishnar" , expression : "joy" , justNum : 200}
,{nama: "ramar" , expression : "dharma" , justNum : 100}
,{nama: "govinda" , expression : "protection" , justNum : 0}
,{nama: "srinivasar" , expression : "granter" , justNum : 300}
,{nama: "narasimhar" , expression : "purifier" , justNum : 50}
 ]);

db.qtest.find({name : {"ramar"]});
