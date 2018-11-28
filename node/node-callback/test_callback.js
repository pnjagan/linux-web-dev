let promise = require('promise');

// console.log('promise - start');
//
// let asyncRead = waitNum => {
//   let someText = 'Some async read .. 1';
//   return someText;
// }

let promiseObj = new Promise(
  (res,rej)=>{
    setTimeout(
      ()=>{
        console.log('Timer completes');

        let rnum = Math.random();
        rnum = Math.round(rnum * 100);

        console.log('rnum :'+rnum);

        if(rnum%2 == 0 ){
          res("SUCCESS");
        }else{
          rej("FAILED");
        }

      }
    ,1000);
  }
);


promiseObj.then(
  res=>{
    let temp = 'PASS :' + res;
    console.log(temp);
    return temp;
  },
  donkey=>{
    //console.log('FAIL :' + donkey);
    let temp = 'FAIL :' + donkey;
    console.log(temp);
    //return temp;
    throw (temp);
  }
).then(
   res=>{console.log('2nd level Success -'+res);}
  ,rej=>{console.log('2nd level Failed  -'+rej);}
);

console.log('everything setup for promise to work...');

class Animal {
  constructor  (name) {
    this.name = name;


  }
   sayHi =  () => {
    if(this){
      console.log(this.name);
    }else{
      console.log('i dont know my context -'+this)
    }
  }



}

Obj1 = {
  name : " someNames",
  fun : function() { console.log('fun - 1');},
  fun2() { console.log('fun - 2');}
}

var cat = new Animal("Cat");
cat.sayHi(); // Cat


var dog = new Animal("Dog")
var dogHi = dog.sayHi;
dogHi(); // Cannot read property 'name' of undefined

Obj1.fun();
Obj1.fun2();

//console.log(' what my then returned :'+chain);
