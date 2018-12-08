import React , {Component} from 'react';
//import './wishlist.css';


import NotificationService,{NOTIF_WISHLIST_LOV_DATA_CHANGED}  from '../services/notification-service'

import DataService from '../services/data-service'
let ds = new DataService();
let ns = new NotificationService();

// eslint-disable-next-line
let log = console.log;
// eslint-disable-next-line
let js2t = JSON.stringify;


class WishListDropDown extends Component {

    constructor(props){
        super(props);
        log('In WishListDropDown constructor ... ');


        this.state = {wishListLovData : [] }


        //No need to bind if using fat-arrow functions
        this.onWishListLovDataChanged = this.onWishListLovDataChanged.bind(this);

    }


  componentDidMount(){
    ns.addObserver(NOTIF_WISHLIST_LOV_DATA_CHANGED,this,this.onWishListLovDataChanged);
  }

  componentWillUnmount(){
    ns.removeObserver(this,NOTIF_WISHLIST_LOV_DATA_CHANGED);
  }


  onWishListLovDataChanged(newWishListLovData){
    console.log('Wish list changed is called :'+js2t(newWishListLovData));
    this.setState({wishListLovData:newWishListLovData});
  }

/*
  createWishList = () => {

    let list = null;
//    console.log("Products :" + JSON.stringify(this.state.wishList[0]));

    // console.log("test :" + JSON.stringify(test));
    // let test2 = test;

    let wishListTemp = this.state.wishList;
    console.log('create wish list :'+JSON.stringify(wishListTemp));
    if(wishListTemp.products){
      list = wishListTemp.products.map( (product) =>
        <ProductCondensed product={product} key={product._id} />
      );
    }
    return (list);
  }

  onSaveClicked = () => {
    ds.saveWishList(this.state.wishList);
  }

  onNewClicked = () => {
    //ds.saveWishList(this.state.wishList);
  }
  */

  render(){
    return(

          <select name='wishlists' defaultValue='default' className='wishListSelect' onChange={evt => this.wishlistSelectionHandler(evt)}>
           {
             this.state.wishListLovData.map(
             wlod => {
               return <option value={wlod._id} key={wlod._id} > {wlod.title}  </option>
             })
           }

          </select>


  );
  }

  wishlistSelectionHandler = (evt)=> {
    //ds handler
    ds.setCurrentWishlist( evt.target.value );
   }

}

export default WishListDropDown;
