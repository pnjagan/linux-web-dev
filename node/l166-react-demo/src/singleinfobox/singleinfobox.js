import React, { Component } from 'react';
import './singleinfobox.css';

class SingleInfoBox extends Component {

  constructor(props){
    super(props);

    console.log(props);

      this.state = {
        card_style : {
        backgroundColor: this.props.bi.bgcolor
        ,color: this.props.bi.fgcolor
        ,margin : '10px 0 20px 0'
      },
        subtitle:{
          color: this.props.bi.stcolor
        }
    }
  }

  render() {
    return (
      <div className='card' style={this.state.card_style}>
        <div className='card-body'>
          <h5 className='card-title'>
              {this.props.bi.title}
          </h5>
          <h6  className='card-subtitle mb-2' style={this.state.subtitle}>
            {this.props.bi.subtitle}
          </h6>
        </div>
      </div >
    );
  }
}

export default SingleInfoBox;
