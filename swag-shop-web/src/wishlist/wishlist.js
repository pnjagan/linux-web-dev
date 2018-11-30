import React , {Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed.js'
//import DataService from '../services/data-service'
import NotificationService,{NOTIF_WISHLIST_CHANGED} from '../services/notification-service'
import HTTPService from '../services/http-service';


let ns = new NotificationService();
const http = new HTTPService();

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

  render(){
    return(
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">
            Wish List
          </h4>
          <ul className="list-group">
            {this.createWishList()}
          </ul>
        </div>
      </div>

  );
  }
}

export default WishList;
