import React, { Component } from 'react';
import './doublecolorbox.css';

class DoubleColorBox extends Component {

  constructor(props){
    super(props);

    //console.log(props);



    this.state = {
        body_style : {
          backgroundColor: this.props.bi.head_color
          ,height: '4.5rem'
          ,color : 'white'
        }
    }

  }

  render() {
    return (
      <div className='card dc_card'>

        <div className='card-body' style={this.state.body_style}>

        <h6  className='card-subtitle subtitle' >
            {this.props.bi.subtitle}
        </h6>

          <h5 className='card-title'>
            {this.props.bi.title}
          </h5>

        </div>
        <div className='card-footer' style={{backgroundColor : 'white',height: '3rem' }}>
        </div>

      </div >
    );
  }
}

export default DoubleColorBox;
