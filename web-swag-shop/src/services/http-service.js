import 'whatwg-fetch'; // new way to import , without require('');




class HTTPService {

  //Get products in implementation without a promise was not returning anything.
  //ANy logic had to be writtern within its call back

  //Now in promise , asyn function returns a promise
  //or token which can be used to ask for service by whoever has reference to that tocken

  //something like , hey once i complete , i would have the result with me , you can tell me what you want to do with that result.
  //I will do what you want me to do after finishing the exec.

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


  getWishLists = () => {
    let promise = new Promise(
      (resolve,reject)=> {
        fetch('http://localhost:3004/wishlist').then(res => {
            console.log('data is fetched');
            resolve(res.json());
            //console.log();
        });
      }
    );
    return promise;
  }

//can save only 1 wish list at a time?
  saveWishList = (wishList) => {

    console.log('Save WISH LIST called');

    console.log(JSON.stringify(wishList));

    let promise = new Promise(
      (resolve,reject)=> {
        fetch('http://localhost:3004/wishlist/upd',{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(wishList)
        })
        .then(res => {
            console.log('wishlist is saved');
            resolve(res.json());
            //console.log();
        },rej=>{
          console.log('Wishlist could not be saved');
          reject(rej);
        });
      }
    );
    return promise;
  }

  createNewWishList = (title)  => {
    let promise = new Promise(

      (resolve,reject)=> {
        fetch('http://localhost:3004/wishlist',{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: '{"title" : "'+title + '"}'
        })
        .then(res => {
            console.log('wishlist is saved');
            resolve(res.json());
            //console.log();
        },rej=>{
          console.log('Wishlist could not be saved');
          reject(rej);
        });
      }

    );

    return promise;
  }


  deleteWishList = (wishlistId)=>{
    let promise = new Promise(

      (resolve,reject)=> {
        fetch('http://localhost:3004/wishlist/delete',{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: '{"_id" : "'+wishlistId + '"}'
        })
        .then(res => {
            console.log('wishlist is deleted');
            resolve(res.json());
            //console.log();
        },rej=>{
          throw new Error('Wishlist could not be deleted');
          //reject(rej);
        });
      }

    );

    return promise;
  }

}

export default HTTPService; // new way to export - instead of module.exports = ''
