import React , {Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed.js'
import WishListDropDown from './wishlist_dropdown.js'
//import DataService from '../services/data-service'
import NotificationService,{NOTIF_WISHLIST_CHANGED} from '../services/notification-service'
//import HTTPService from '../services/http-service';

import DataService from '../services/data-service'
let ds = new DataService();

let ns = new NotificationService();
//const http = new HTTPService();

// eslint-disable-next-line
let log = console.log;
// eslint-disable-next-line
let js2t = JSON.stringify;


class WishList extends Component {

    constructor(props){
        super(props);


       this.state  = {
         wishList :
              {
                products:[]
              }
        ,createWishListFormDisplay : 'none'
        ,newWishListName: "rama's choice"
        ,createWishListFeedbackMessageDisplay: 'block'
        ,createWishListFeedbackMessage: ''
       }


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

  onNewWishListClicked = () => {
    //ds.saveWishList(this.state.wishList);
    let localCreateWishListFormDisplay = null;
    if(this.state.createWishListFormDisplay === 'none'){
      localCreateWishListFormDisplay = 'block'
    }else{
      localCreateWishListFormDisplay = 'none'
    }

    this.setState(
      {
        createWishListFormDisplay : localCreateWishListFormDisplay
      }
    );
  }

  onCreateWishListClicked = () => {
    //ds.saveWishList(this.state.wishList);
    log(' Title of new wish list to be created :' + this.state.newWishListName)

    if(ds.isWishListTitleAlreadyExists(this.state.newWishListName)){

    }else{

    }

  }

  updateWishListNameInputValue = (evt)=> {
     this.setState({
       newWishListName: evt.target.value
     }
     );
   }


  render(){
    return(
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">
            Wish List
          </h4>


{/*New wishlist creation code */}

         <button style= {{display: (this.state.createWishListFormDisplay==='none'?'inline-block':'none') }}  type="button" className="btn btn-primary btn-sm" onClick={()=>this.onNewWishListClicked()} >Add New Wishlist</button>
         <form style={{display: this.state.createWishListFormDisplay }} >

          <div className="row">
          <div className="col-sm-12">
            <input type='text' onChange={evt => this.updateWishListNameInputValue(evt)} />
            <button name="doWishListCreation" type="button" onClick= {()=>{this.onCreateWishListClicked()}}> Create </button><button type="button" name="cancelWishListCreation" onClick={()=>this.onNewWishListClicked()} >Cancel</button>
          </div>
          </div>

          <div className="row">
            <div className="col-sm-12"> <span> {this.state.createWishListFeedbackMessage}</span> </div>
          </div>

         </form>


          <WishListDropDown />


          <ul className="list-group">
            {this.createWishList()}
          </ul>

          <button type="button" className="btn btn-primary" onClick={()=>this.onSaveClicked()} >Save Wishlist</button>

        </div>
      </div>

  );
  }
}

export default WishList;
