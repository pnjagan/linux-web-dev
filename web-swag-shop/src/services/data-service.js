import NotificationService,{NOTIF_WISHLIST_CHANGED,NOTIF_WISHLIST_LOV_DATA_CHANGED} from './notification-service';
import HTTPService from '../services/http-service';

// eslint-disable-next-line
let log = console.log;
// eslint-disable-next-line
let js2t = JSON.stringify;


let assert = require('assert');



const http = new HTTPService();
let ns = new NotificationService();

let instance=null;



//eval('1+2');


class DataService {

  constructor(){
    if(!instance){
      instance = this;

      this.wishLists = []; //complete data of all the wishlist and items within
      this.currentWishList = null; //current wishlist
      this.wistListOptions = []; //wishlist title and Id

      this.loadWishLists();
    }
    //this.wishLists = wishLists;

    return instance;
  }




  itemOnWishList = ( item) => {

    console.log(" checkng item :"+item._id);

    if(!this.currentWishList){
      return false;
    }else if(this.currentWishList.products.filter(prod => prod._id ===item._id).length >0 ) {
      return true;
    }else{
      return false;
    }

  }

  isWishListTitleAlreadyExists = (wishListName) => {

    log(" checkng wishlist title :"+wishListName);

    let matchingItem = this.wistListOptions.filter(
      (wl_item)=>{
        return (wl_item.title===wishListName)?true:false
      }
    );

    if(matchingItem.length >0){
      return true;
    }else{
      return false;
    }

  }

  addWishListItem = (item) => {

    this.currentWishList.products.push(item);
    ns.postNotification(NOTIF_WISHLIST_CHANGED,this.currentWishList);
  }

  removeWishListItem = (item) => {

    this.currentWishList.products =this.currentWishList.products.filter(prod_element=> { return (prod_element._id !== item._id) });
    ns.postNotification(NOTIF_WISHLIST_CHANGED,this.currentWishList);

  }

//SAVE only 1 wishlist at a time
  saveWishList = wishList => {
    http.saveWishList(wishList)
      .then(
        res=>{
          console.log("Wish list is saved!");
        },
        err => {
          console.log('ERROR!!!'+err);
        }
      );
}

//SAVE only 1 wishlist at a time
  createNewWishList = title => {

    return http.createNewWishList(title)
      .then(
        res=>{
          console.log("Wish list is created!");
          this.loadWishLists();
          return "Wish list is created!";
        },
        err => {
          console.log('ERROR!!!'+err);
          throw new Error('ERROR!!!' + err);
        }
      );
  }

  loadWishLists = () => {
    http.getWishLists().then(
      data=>{
        //console.log(products);
        log('this is the handler then WL is loaded ...');

        //eval('1+2');
        //setState will replace existing state component
        this.wishLists = data;//Assume a list of wishList is sent
        this.wistListOptions = [];

        if(data.length > 0){
          this.currentWishList = data[0];

        }
        assert(Array.isArray(this.wishLists))

        this.wistListOptions = this.wishLists.map(
           mi => { return {_id : mi._id , title : mi.title}}
        );

        // log('Hello World - modules');
        //
        // log("Get WLs :"+js2t(this.wishLists));
        // log('WL list option :'+ js2t(this.wistListOptions));
        //
        // log('printing wishlistoptions -----------------')
        // console.log(this.wistListOptions);

        ns.postNotification(NOTIF_WISHLIST_CHANGED,this.currentWishList);
        ns.postNotification(NOTIF_WISHLIST_LOV_DATA_CHANGED,this.wistListOptions);

      }, err => {
        console.log('ERROR!!!');
      }
    );
  }

  setCurrentWishlist = (wishlistId)=>{
    let wl_res = this.wishLists.filter(wl_element =>{
      return (wl_element._id === wishlistId);
    });

    if(wl_res.length>0){
      this.currentWishList = wl_res[0];
      ns.postNotification(NOTIF_WISHLIST_CHANGED,this.currentWishList);
    }

  }

  deleteWishList = ()=>{
    http.deleteWishList(this.currentWishList._id).then(
      res=>{
        this.loadWishLists();
      }
    );
  }


}


export default DataService;
