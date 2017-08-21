import React, { Component } from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';


import GraphPicture from './GraphPicture';
import InputPanel from './InputPanel';

injectTapEventPlugin();

class App extends Component {
  constructor(){
    super();
    this.inputHandler = this.inputHandler.bind(this);
    this.curveDrawer = this.curveDrawer.bind(this);
    this.state = {
      parameters : {  m: 1,
                      lambda: 3,
                      a: 0,
                      b: 1,
                      modulo: 5
                    },
      points : {}
    }
  }

  inputHandler(updated_parameters){
    this.setState({
        parameters : updated_parameters
      }
    );
  }

  curveDrawer(updated_points){
    this.setState(
      {
        points : updated_points
      }
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <InputPanel onInput={this.inputHandler.bind(this)} defaultParameters={this.state.parameters} >
          </InputPanel>
          <GraphPicture parameters={this.state.parameters}>
          </GraphPicture>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
