import NotificationService,{NOTIF_WISHLIST_CHANGED} from './notification-service';

let ns = new NotificationService();

let instance=null;
let wishList=[];

class DataService {

  constructor(){
    if(!instance){
      instance = this;
    }
    return instance;
  }




  itemOnWishList = item => {
    for (let i =0; i<wishList.length; i++){
      if(wishList[i]._id === item._id) {
        return true;
      }
    }
    return false;
  }

  addWishListItem = item => {

    console.log('pushing item on to wish list :'+JSON.stringify(item));
    wishList.push(item);
    ns.postNotification(NOTIF_WISHLIST_CHANGED,wishList);
  }

  removeWishListItem = item => {
    for( let i = 0 ; i< wishList.length; i++){
      if(wishList[i]._id === item._id){
        wishList.splice(i,1);
        ns.postNotification(NOTIF_WISHLIST_CHANGED,wishList);
        break;
      }
    }

  }
}

export default DataService;
