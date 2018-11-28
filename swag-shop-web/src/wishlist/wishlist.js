import React , {Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed.js'
//import DataService from '../services/data-service'
import NotificationService,{NOTIF_WISHLIST_CHANGED} from '../services/notification-service'

let ns = new NotificationService();

class WishList extends Component {

    constructor(props){
        super(props);

        //this.state.wishList = {[{}]}

        this.state  = {
          wishList : []
        }

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
    this.setState({wishList:newWishList});
  }

  createWishList = () => {
    const list = this.state.wishList.map( (product) =>
      <ProductCondensed product={product} key={product._id} />
    );

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
