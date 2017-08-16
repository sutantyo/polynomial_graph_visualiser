import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

let inputBoxStyle = {
  paddingLeft: '18px',
  marginRight: '22px',
  fontSize: '14px',
  width: '60px'
}

class InputPanel extends React.Component {

    componentWillMount(){
      this.m = this.props.defaultParameters.m;
      this.lambda = this.props.defaultParameters.lambda;
      this.a = this.props.defaultParameters.a;
      this.b = this.props.defaultParameters.b;
      this.modulo = this.props.defaultParameters.modulo;
    }

    onClick(){
      let parameters = {
        lambda: this.lambda,
        m: this.m,
        a: this.a,
        b: this.b,
        modulo: this.modulo
      }
      this.props.onInput(parameters);
    }

    render() {
      return(
        <div>
          <span>
            <TextField defaultValue={this.lambda}
                      style={inputBoxStyle}
                      floatingLabelText="lambda"
                      onChange={(e) => this.lambda = parseInt(e.target.value)}/>
          </span>
          <span>
            <TextField defaultValue={this.lambda}
                      style={inputBoxStyle}
                      floatingLabelText="m"
                      onChange={(e) => this.m = parseInt(e.target.value)}/>
          </span>
          <span>
            <TextField defaultValue={this.a}
                      style={inputBoxStyle}
                      floatingLabelText="a"
                      onChange={(e) => this.a = parseInt(e.target.value)}/>
          </span>
          <span>
            <TextField defaultValue={this.b}
                      style={inputBoxStyle}
                      floatingLabelText="b"
                      onChange={(e) => this.b = parseInt(e.target.value)}/>
          </span>
          <span>
            <TextField defaultValue={this.modulo}
                      style={inputBoxStyle}
                      floatingLabelText="modulo"
                      onChange={(e) => this.modulo = parseInt(e.target.value)}/>
          </span>
          <span>
            <RaisedButton label="Create" onClick={this.onClick.bind(this)}/>
          </span>
        </div>
      )
    }
}

export default InputPanel;
