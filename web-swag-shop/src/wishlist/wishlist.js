import React , {Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed.js'
//import DataService from '../services/data-service'
import NotificationService,{NOTIF_WISHLIST_CHANGED} from '../services/notification-service'
//import HTTPService from '../services/http-service';

import DataService from '../services/data-service'
let ds = new DataService();

let ns = new NotificationService();
//const http = new HTTPService();

class WishList extends Component {

    constructor(props){
        super(props);

        //this.state.wishList = {[{}]}

       this.state  = {wishList :
              {
                products:[]
              }
       }
       //this.setState({wishList:{}});



        //No need to bind if using fatarrow functions
        this.onWishListChanged = this.onWishListChanged.bind(this);

    }

  componentDidMount(){
    ns.addObserver(NOTIF_WISHLIST_CHANGED,this,this.onWishListChanged);
  }

  componentWillUnmount(){
    ns.removeObserver(this,NOTIF_WISHLIST_CHANGED);
  }

  onWishListChanged(newWishList){

    console.log('Wish list changed is called :'+JSON.stringify(newWishList))
    this.setState({wishList:newWishList});
  }

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

  render(){
    return(
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">
            Wish List
          </h4>
          <form>
          <button type="button" className="btn btn-primary btn-sm" onClick={()=>this.onNewClicked()} >Add New Wishlist</button>

          <select name='wishlists' defaultValue='default' className='wishListSelect'>
           <option value='default'> default</option>
           <option value='value 2' > value 2</option>
           <option value='value 1' > value 1</option>
          </select>


          <ul className="list-group">
            {this.createWishList()}
          </ul>

          <button type="button" className="btn btn-primary" onClick={()=>this.onSaveClicked()} >Save Wishlist</button>
          </form>
        </div>
      </div>

  );
  }
}

export default WishList;
