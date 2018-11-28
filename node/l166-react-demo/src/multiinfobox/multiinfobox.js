import React, { Component } from 'react';
import './multiinfobox.css';

class MultiInfoBox extends Component {

  constructor(props){
    super(props);

    //console.log(props);

    this.state = {
    mbHdrStyle :{
      height : '6rem',
      backgroundColor : this.props.mib.header_color
    },
    mbFooterStyle :{
        backgroundColor : '#4a4f4e'
        // margin :'0',
        // padding : '0'
    },
    spanNumStyle : {
      color : 'white'
      ,fontSize : '1.6rem'
      ,margin: '0'
    },
    spanNameStyle : {
      color : 'white'
      ,fontSize : '.7rem'
      ,margin: '0'
    }
  }

  }

  render() {
    return (
      <div className='card mi-card 	'>

        <div className='card-header' style={this.state.mbHdrStyle} > </div>

        <div className='card-body ' style={this.state.mbFooterStyle}>

          <div className='container-fluid'  >
          <div className='row'  >

            <div className='col-4'>
              <div className='row'>
                <div className='col-sm-12'>
                  <p className='statsNum' style={this.state.spanNumStyle} >15080</p>
                  <p className='statsName' style={this.state.spanNameStyle} >Shot Views</p>
                </div>
              </div>
            </div>

            <div className='col-4'>
              <div className='row'>
                <div className='col-sm-12'>
                  <p className='statsNum' style={this.state.spanNumStyle} >12000</p>
                  <p className='statsName' style={this.state.spanNameStyle} >Likes</p>
                </div>
              </div>
            </div>

            <div className='col-4'>
              <div className='row'>
                <div className='col-sm-12'>
                  <p className='statsNum' style={this.state.spanNumStyle}>5100</p>
                  <p className='statsName'  style={this.state.spanNameStyle}>Comments</p>
                </div>
              </div>
            </div>

          </div>
          </div>
        </div>


      </div >
    );
  }
}

export default MultiInfoBox;
