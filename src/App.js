import React, { Component } from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';


import GraphPicture from './GraphPicture';
import InputPanel from './InputPanel';

injectTapEventPlugin();

class App extends Component {
  constructor(){
    super();
    this.inputHandler = this.inputHandler.bind(this);
    this.state = {
      n: 2,
      m: 3,
      lambda: 3,
      b: 0,
      a: 1,
      p: 7
    }
  }

  inputHandler(parameters){
    console.log(parameters);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <InputPanel onInput={this.inputHandler.bind(this)} >
          </InputPanel>
          <GraphPicture>
          </GraphPicture>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
