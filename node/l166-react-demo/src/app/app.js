import React, { Component } from 'react';

import './app.css';

import SingleInfoBox  from  '../singleinfobox/singleinfobox.js';
import MultiInfoBox   from  '../multiinfobox/multiinfobox.js';
import DoubleColorBox from  '../doublecolorbox/doublecolorbox.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {box : [
      {
        box_id: "l-sm-1",
        title: "20",
        subtitle: "New followers added this month",
        bgcolor: "#ffffff",
        stcolor: "#959595",
        fgcolor: "#555555"
      },
      {
        box_id: "l-sm-2",
        title: "$ 1250",
        subtitle: "Average Monthly Income",
        bgcolor: "#ffffff",
        stcolor: "#959595",
        fgcolor: "#555555"
      },
      {
        box_id: "l-sm-3",
        title: "$ 13865",
        subtitle: "Yearly Income Goal",
        bgcolor: "#ffffff",
        stcolor: "#959595",
        fgcolor: "#555555"
      },
      {
        box_id: "r-sm-1",
        title: "18º",
        subtitle: "Paris",
        bgcolor: "#F99100",
        stcolor: "#ffffff",
        fgcolor: "#ffffff"
      }
    ],
    double_color_box : [
      {
        head_color : '#427ed6'
        ,subtitle: 'New visitors'
        ,title: '1.5k'
      }
      ,{
        head_color : '#ba57da'
        ,subtitle: 'Bounce Rate'
        ,title: '50%'
      }
      ,{
        head_color : '#fc2300'
        ,subtitle: 'Searchs'
        ,title: '28%'
      }
      ,{
        head_color : '#4cd34c'
        ,subtitle: 'Traffic'
        ,title: '140.5kb'
      }
    ],
    multi_info_box : [
      {
        header_color : '#427ed6'
      },
      {
        header_color : '#d100b0'
      }
    ]

  } // for now empty
  }

  render() {
    return (
      <div className="App container-fluid">
      <div className='row'>

        <div className='col-sm-9 large-section'>
        {/*the larger section starts here*/}
        <div className='row'>
          <div className='col-sm-4'>
            <SingleInfoBox bi={this.state.box[0]} />
          </div>
          <div className='col-sm-4'>
            <SingleInfoBox bi={this.state.box[1]} />
          </div>
          <div className='col-sm-4'>
            <SingleInfoBox bi={this.state.box[2]} />
          </div>
        </div>

        {/*First multi box*/}
        <div className='row'>
          <div className='col-sm-12'>
            <MultiInfoBox mib={this.state.multi_info_box[0]}/>
          </div>
        </div>

        {/*Second multi box*/}
        <div className='row'>
          <div className='col-sm-12'>
            <MultiInfoBox mib={this.state.multi_info_box[1]}/>
          </div>
        </div>


        </div>
        {/*the larger section ends here*/}


        {/*The small section starts here*/}
        <div className='col-sm-3 d-none d-sm-block '>

          <div className='row'>
            <div className='col-sm-12'>
              <SingleInfoBox  bi={this.state.box[3]} />
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-12'>
            <DoubleColorBox  bi={this.state.double_color_box[0]} />
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-12'>
            <DoubleColorBox  bi={this.state.double_color_box[1]} />
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-12'>
            <DoubleColorBox bi={this.state.double_color_box[2]} />
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-12'>
            <DoubleColorBox bi={this.state.double_color_box[3]} />
            </div>
          </div>
        </div>
        {/*The small section ends here*/}

      {/*ENd of the row and container*/}
      </div>
      </div>
    );
  }
}

export default App;
