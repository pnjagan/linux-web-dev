export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";


let observers ={} //its not an array to avoid looping.
//We are using object like a Map

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
      for(var x=0; x < obs.length ; x++){
        if(obs){
          let obj = obs[x];
          obj.callBack(data);
        }

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
