import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

let inputBoxStyle = {
  paddingLeft: '18px',
  marginRight: '22px',
  fontSize: '14px'
}

class InputPanel extends React.Component {

    render() {
      return(
        <div>
          <span>
            n: 
            <TextField hintText="n" style={inputBoxStyle} style={{width:'80px'}}/>
          </span>
          <span>
            <TextField hintText="m" style={inputBoxStyle} style={{width:'80px'}}/>
          </span>
          <span>
            <TextField hintText="lambda" style={inputBoxStyle} style={{width:'80px'}}/>
          </span>
          <span>
            <TextField hintText="b" style={inputBoxStyle} style={{width:'80px'}}/>
          </span>
          <span>
            <TextField hintText="a" style={inputBoxStyle} style={{width:'80px'}}/>
          </span>
          <span>
            <TextField hintText="modulo" style={inputBoxStyle} style={{width:'80px'}}/>
          </span>
          <span>
            <RaisedButton label="Create" onClick={this.props.onInput}/>
          </span>
        </div>
      )
    }
}

export default InputPanel;
