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
    this.state = {
      parameters : {  m: 3,
                      lambda: 2,
                      a: 0,
                      b: 0,
                      modulo: 5
                    }
    }
  }

  inputHandler(updated_parameters){
    this.setState({
        parameters : updated_parameters
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
