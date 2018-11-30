import NotificationService,{NOTIF_WISHLIST_CHANGED} from './notification-service';
import HTTPService from '../services/http-service';

const http = new HTTPService();
let ns = new NotificationService();

let instance=null;
let wishList={
  products:[]
};

class DataService {

  constructor(){
    if(!instance){
      instance = this;

      http.getWishList().then(
        data=>{
          //console.log(products);
          console.log('this is the handler then WL is loaded ...');
          //setState will replace existing state component
          this.wishList = data[0];//Assume a single wishList is sent

          console.log("Get WL 1st element :"+JSON.stringify(data[0]));
          //this.setState ({wishList: data[0]});//Assume a single wish list is sent


          ns.postNotification(NOTIF_WISHLIST_CHANGED,this.wishList);


        }, err => {
          console.log('ERROR!!!');
        }
      );
    }




    return instance;
  }




  itemOnWishList = item => {

    console.log(" checkng item :"+item._id);

    for (let i =0; i<this.wishList.products.length; i++){
      if(this.wishList.products[i]._id === item._id) {
        return true;
      }
    }
    return false;
  }

  addWishListItem = item => {

    console.log('pushing item on to wish list :'+JSON.stringify(item));
    console.log(' wish list :'+JSON.stringify(this.wishList.products));

    this.wishList.products.push(item);

    ns.postNotification(NOTIF_WISHLIST_CHANGED,this.wishList);
  }

  removeWishListItem = item => {
    for( let i = 0 ; i< this.wishList.products.length; i++){
      if(this.wishList.products[i]._id === item._id){
        this.wishList.products.splice(i,1);
        ns.postNotification(NOTIF_WISHLIST_CHANGED,this.wishList);
        break;
      }
    }

  }
}

export default DataService;
