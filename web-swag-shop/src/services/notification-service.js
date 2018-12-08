export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";
export const NOTIF_WISHLIST_LOV_DATA_CHANGED = "notif_wishlist_lov_data_changed";

// eslint-disable-next-line
let assert = require('assert');

let observers ={} //its not an array to avoid looping.
//We are using object like a Map
//this has a key for each notif string
//, and value corresponding to that key is an array with observer and callback

let instance = null

class NotificationService {
    constructor(){
      if(!instance){
        instance = this;
      }
      return instance;
    }

    postNotification = (notifName , data) => {

      let obs = observers[notifName];

      if(obs){

      //start of for LOOP
      for(var x=0; x < obs.length ; x++){
        if(obs){
          let obj = obs[x];
          obj.callBack(data);
        }
      }
      //end of for LOOP

    }else{
      console.log('Notification fired for an event having no observer');
    }
  }

    removeObserver = (observer, notifName) => {
      let obs = observers[notifName];

      if(obs){
        for(let x = 0; x < obs.length;x++){
          if(observer === obs[x].observer){
            obs.splice(x,1);
            observer[notifName] = obs;
            break;
          }
        }
      }

    }

//not really sure what to do with observer object when callback is there?
//if the event fires , we will call the callback , but what would you do with the observer?
//yea lets figure that out as we progress
    addObserver = (notifName ,observer ,callback) => {
      let obs = observers[notifName]; //accessing object by key - Notif

      if(!obs){
        observers[notifName] = []; //create a key in the object if it does not exists
      }

      let obj = {observer: observer, callBack: callback};
      observers[notifName].push(obj);

    }
}

export default NotificationService;
