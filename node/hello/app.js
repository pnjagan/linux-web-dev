var pf = require('./print.js');
var co = require('./calc.js');
var colors = require('colors');


pf('srirama jayarama');

var num1 = 4
var num2 = 6


pf(' add :'+co.add(num1,num2) );


pf(' sub :'+co.sub(num1,num2) );


pf(' mult :'+co.mult(num1,num2) );



pf(' div :'+co.div(num1,num2) );


console.log('Om matyadevAya namaH'.green.bgRed);
console.log(' ');
console.log('Om kurmadevAya namaH'.italic.bgGreen);
console.log(' ');

console.log('hello'.green); // outputs green text
console.log('i like cake and pies'.strikethrough.red) // outputs red underlined text
console.log('inverse the color'.inverse); // inverses the color
console.log('OMG Rainbows!'.rainbow); // rainbow
console.log('Run the trap'.trap); // Drops the bass
