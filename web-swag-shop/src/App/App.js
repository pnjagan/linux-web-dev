import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HTTPService from '../services/http-service';

import Product from '../product/product';
import WishList from '../wishlist/wishlist'


const http = new HTTPService();

class App extends Component {

  constructor(props){
    super(props);


    this.state = {products : []} // for now empty

    //this may not be required , as loaddata is created using fat arrow syntax
  //this.loadData = this.loadData.bind(this);
  //  this.productList = this.productList.bind(this);

    this.loadData();


  }

  loadData = ()=>{

    //var self =this; //even though this is available here refering to component , that might be lost when sent to promise
    //really
    //will have to test removing this and also the bind(thi)

    http.getProducts().then(
      data=>{
        //console.log(products);
        console.log('this is the handler then Products is loaded ...');

        this.setState ({products: data}); //setState will reload the components in React
        //basically it might call the render function
        //setState works top down.

      }, err => {
        console.log('ERROR!!!');
      }
    );
  };

  productList = ()=>{

    console.log('this is called');
    console.log('prod len '+this.state.products.length);

    const list = this.state.products.map((product)=>
      <div className="col-sm-4" key={product._id}>
        <Product product={product} />
      </div>
    );

    return (list); //react expects this parenthesis here
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
         <h2>Om Sriramajayam</h2>

        </div>
        <div className='container-fluid App-Main'>
        <div className='row'>
          <div className='col-sm-8'>
            <div className='row'>
              {this.productList()}
            </div>
          </div>
          <div className='col-sm-4'>
            <WishList />
          </div>
        </div>
        </div>
      </div>
    );
  };


}

export default App;
