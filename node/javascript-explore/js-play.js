function RectangleSpl (sidea,sideb){
  this.sidea = sidea;
  this.sideb = sideb
  this.area = function(){return sidea*sideb;}
  this.perimeter = function(){return (sidea+sideb)*2;}
}

RectangleSpl.rectType = "Special";

//

let Rectangle = function (sidea,sideb){
  this.sidea = sidea;
  this.sideb = sideb
  this.area = function(){return sidea*sideb;}
  this.perimeter = function(){return (sidea+sideb)*2;}
}


Rectangle.numberOfSides = ()=>{return 2;};

let rect1 = new Rectangle(2,3);
console.log("Perimeter :"+rect1.perimeter());

console.log("Sides :"+Rectangle.numberOfSides());

console.log('*********************************');
let rect2 = new RectangleSpl(18,15);

console.log("area :"+rect2.area());

console.log("Perimeter :"+rect2.perimeter());

console.log("rectType :"+RectangleSpl.rectType);


