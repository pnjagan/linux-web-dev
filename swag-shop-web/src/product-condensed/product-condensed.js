import React , {Component} from 'react';
import './product-condensed.css';
import DataService from '../services/data-service'
let ds = new DataService();

class ProductCondensed extends Component {

  constructor(props){
    super(props);
    console.log('no bind needed here');
    this.removeProduct = this.removeProduct.bind(this);
  }

  removeProduct = ()=>{
    console.log('this.props.product '+JSON.stringify(this.props.product));
    ds.removeWishListItem(this.props.product);
  }

  render(){
    return(
      <li className="list-group-item pc-condensed">

        <a className="btn btn-outline-danger" onClick={()=>this.removeProduct()} href="#">X</a>
        <span>{this.props.product.title} | <b>{this.props.product.price}</b></span>

      </li>
  );
  }
}

export default ProductCondensed;
