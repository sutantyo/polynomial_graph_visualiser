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
      this.b = this.props.defaultParameters.b;
      this.a = this.props.defaultParameters.a;
      this.modulo = this.props.defaultParameters.modulo;
    }

    onClick(){
      let parameters = {
        m: this.m,
        lambda: this.lambda,
        b: this.b,
        a: this.a,
        modulo: this.modulo
      }
      this.props.onInput(parameters);
    }

    render() {
      return(
        <div>
          <span>
            <TextField defaultValue={this.m}
                      style={inputBoxStyle}
                      floatingLabelText="m"
                      onChange={(e) => this.m = e.target.value}/>
          </span>
          <span>
            <TextField defaultValue={this.lambda}
                      style={inputBoxStyle}
                      floatingLabelText="lambda"
                      onChange={(e) => this.lambda = e.target.value}/>
          </span>
          <span>
            <TextField defaultValue={this.b}
                      style={inputBoxStyle}
                      floatingLabelText="b"
                      onChange={(e) => this.b = e.target.value}/>
          </span>
          <span>
            <TextField defaultValue={this.a}
                      style={inputBoxStyle}
                      floatingLabelText="a"
                      onChange={(e) => this.a = e.target.value}/>
          </span>
          <span>
            <TextField defaultValue={this.modulo}
                      style={inputBoxStyle}
                      floatingLabelText="modulo"
                      onChange={(e) => this.modulo = e.target.value}/>
          </span>
          <span>
            <RaisedButton label="Create" onClick={this.onClick.bind(this)}/>
          </span>
        </div>
      )
    }
}

export default InputPanel;
