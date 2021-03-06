import React , {Component} from 'react';
import './product.css';
import DataService from '../services/data-service'

import NotificationService,{NOTIF_WISHLIST_CHANGED} from '../services/notification-service'
let ns = new NotificationService();

let ds = new DataService();

//save some typing
//also we have a scope to wrap it to not to log when moving to prod

// eslint-disable-next-line
let log = console.log;
// eslint-disable-next-line
let js2t = JSON.stringify;


class Product extends Component {

  constructor(props){
    super(props);

    //console.log('here to avoid useless constructor message :-)');
    // log('this PRODUCT ' + js2t(this.props));
    // log(' PRODUCT ' + js2t(props));

    this.state = {onWishList: ds.itemOnWishList(this.props.product)};

    this.onWishListChanged = this.onWishListChanged.bind(this);

  }

  componentDidMount(){
    ns.addObserver(NOTIF_WISHLIST_CHANGED,this,this.onWishListChanged);
  }

  componentWillUnmount(){
    ns.removeObserver(this,NOTIF_WISHLIST_CHANGED);
  }

  onWishListChanged(newWishList){
    this.setState({onWishList:ds.itemOnWishList(this.props.product)});
    console.log('Wish List changed - item on Wish List :'+ds.itemOnWishList(this.props.product));
  }

  onButtonClicked = () => {

    //console.log('CLicked in product :' + this.state.onWishList + this.props.product);

    if(this.state.onWishList){
      ds.removeWishListItem(this.props.product);
    }else{
      ds.addWishListItem(this.props.product);
    }
  }

  render(){

    let btnClass;
    if(this.state.onWishList){
      btnClass = "btn btn-danger";
    }else{
      btnClass = "btn btn-primary";
    }
    return(
    <div className='card product'>
     {
       (this.props.product.videoURL)?
         <iframe width="100%"  src={this.props.product.videoURL} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       :
         <img className='card-img-top img-fluid' src={'./images/products/' + this.props.product.imgName} alt='Product' ></img>

    }
      <div className='card-block'>
        <h4 className='card-title'>{this.props.product.title}</h4>
        <p className='card-text'>Price: ${this.props.product.price}</p>
        <button onClick={()=>this.onButtonClicked()} className={btnClass} >
          {this.state.onWishList?'Remove from wishList':'Add to cart'}
        </button>
      </div>
    </div>
  );
  }
}

export default Product;
