let rls = require('readline-sync');

let temp = rls.question('Please enter the first number :');

let num1 = parseFloat(temp);
//console.log('num1 :'+num1);

temp = rls.question('Please enter the second number :');

let num2 = parseFloat(temp);

if( isNaN(num2) || isNaN(num1) ){
  console.log('Invalid numbers - cannot perform operation');
  return;
}
let operation = rls.question('Please enter the operation :');

let result = ''
let errMsg = ''

switch(operation){
  case '+' : result = num1 + num2; break;
  case '*' : result = num1 * num2; break;
  case '-' : result = num1 - num2; break;
  case '/' : if(num2 === 0){errMsg = 'Cannot perform divide if 2nd argument is 0'; } else { result = num1 / num2;} break;
  default  : result = '' ; errMsg = 'Unsupported operation '+operation
}

if(!errMsg){
  console.log('The result of the operation is :'+result);
}else{
  console.log('The operation could not be performed. Error :'+errMsg);
}
