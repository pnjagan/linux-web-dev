import 'whatwg-fetch'; // new way to import , without require('');




class HTTPService {

  //Get products in implementation without a promise was not returning anything.
  //ANy logic had to be writtern within its call back

  //Now in promise , asyn function returns a promise
  //or token which can be used to ask for service by whoever has reference to that tocken

  //something like , hey once i complete , i would result with me , you can tell me what you want to do with that result.
  //once you tell me what you want me to do with that result , i will initiate the process that produces the result
  getProducts = () => {
    let promise = new Promise(
      (resolve,reject)=> {
        fetch('http://localhost:3004/product').then(res => {
            console.log('data is fetched');
            resolve(res.json());
            //console.log();
        });
      }
    );
    return promise;
  }
}

export default HTTPService; // new way to export - instead of module.exports = ''
