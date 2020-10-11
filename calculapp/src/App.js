import React, { Component } from 'react';
import './App.css';



const Input = props => <div className= "Input">{props.input}</div>;
const BClear = props => (<div className="Button" onClick={props.handleClear} >{props.children}</div>);
const isOp = val => {
  return !isNaN(val) || val === "," || val === "=";
};
const Button = props => (
  <div
    className={`Button ${
      isOp(props.children) ? null : "operator"
    }`}
    onClick={() => props.handleClick(props.children)}
  >
    {props.children}
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      currentOperand: '',
      previousOperand: '',
      operation: '',
      Memory: '',
      Result: '',
      proximo_numero: 'false',
      ponto: 'false'
      };
  }
  

  Clear = val => {
    if (val == 'AC') {
      this.setState({
        input: '',
        currentOperand: '',
        previousOperand: '',
        operation: '',
        Result: ''
      });
    }
  }


  AddInput = val => {

    if (val != '.') {
    this.setState({input: this.state.input + val});
    }


    if (val == '.' && this.state.ponto == 'false' && this.state.proximo_numero != 'true') {
    this.setState({input: this.state.input + val});
    this.setState({currentOperand: this.state.currentOperand + val})
    this.setState({ponto: 'true'});
    }
    if (val == '.' && this.state.ponto == 'false' && this.state.proximo_numero == 'true') {
      this.setState({input: this.state.input + val});
      this.setState({previousOperand: this.state.previousOperand + val})
      this.setState({ponto: 'true'});
    }


    if (  val != '=' && val !='*' && val !='÷' && val !='.' && this.state.proximo_numero == 'false' ) {
      this.setState({currentOperand: this.state.currentOperand + val})
    }
    if ( (val == '+' || val == '-' || val =='*' || val =='÷') && (this.state.currentOperand != '-' && this.state.currentOperand != '+' && this.state.currentOperand != '' && this.state.proximo_numero == 'false')) {
      this.setState({operation: val, proximo_numero: 'true', ponto: 'false'});
    }

    if (val == '='){
      this.setState({Memory: this.state.input + val})
      if (this.state.operation == '+') {
      this.setState({input: parseFloat(this.state.currentOperand) + parseFloat(this.state.previousOperand), operation: ''})
      this.setState({currentOperand: parseFloat(this.state.currentOperand) + parseFloat(this.state.previousOperand),previousOperand: ''})
      }
      if (this.state.operation == '-') {
        this.setState({input: parseFloat(this.state.currentOperand) - parseFloat(this.state.previousOperand)})
        this.setState({currentOperand: parseFloat(this.state.currentOperand) - parseFloat(this.state.previousOperand),previousOperand: ''})
      }
      if (this.state.operation == '*') {
        this.setState({input: parseFloat(this.state.currentOperand) * parseFloat(this.state.previousOperand)})
        this.setState({currentOperand: parseFloat(this.state.currentOperand) * parseFloat(this.state.previousOperand),previousOperand: ''})
      }
      if (this.state.operation == '÷') {
        this.setState({input: parseFloat(this.state.currentOperand) / parseFloat(this.state.previousOperand)})
        this.setState({currentOperand: parseFloat(this.state.currentOperand) / parseFloat(this.state.previousOperand),previousOperand: ''})
      }
      this.setState({ponto:' false'})
      
    }
    if ((val == '-' || val == '+') && (this.state.previousOperand == '' && this.state.proximo_numero == 'true')) {
      this.setState({previousOperand: this.state.previousOperand + val}) 
    }
    if (this.state.proximo_numero == 'true' && val != '-' && val != '+' && val != '=' && val != '.' && val != '*' && val != '÷') {
      this.setState({previousOperand: this.state.previousOperand + val}) 
    }
    
    
  }

  Operation = val => {
    if (this.state.currentOperand != '') {
    this.setState({operation: val, proximo_numero: 'true', ponto: 'false'});
    }
  }


  handleEqual = () => {
    this.setState({ input: '' });
  };


  render() {
    return(
    <div className="App">
      <div className = 'Title'>
      <img src={"./Meca.png"} className="App-logo" alt='Logo' />
        <p>
          Poli-Calculator
        </p>
      </div>
      <header className="App-header">
        <div className= 'calc' >
          <Input input={this.state.Memory}>A</Input>
          <Input input={this.state.input}></Input>

          <div className='row'>
            <Button class= 'Op'  handleClick={this.AddInput}>=</Button>
          </div>


          <div className='row'>
            <Button class= 'Button' handleClick={this.AddInput}>7</Button>
            <Button class= 'Button' handleClick={this.AddInput}>8</Button>
            <Button class= 'Button' handleClick={this.AddInput}>9</Button>
            <Button class= 'Op' handleClick={this.AddInput}>÷</Button>
          </div>
          <div className='row'>
            <Button class= 'Button' handleClick={this.AddInput}>4</Button>
            <Button class= 'Button' handleClick={this.AddInput}>5</Button>
            <Button class= 'Button' handleClick={this.AddInput}>6</Button>
            <Button class= 'Op' handleClick={this.AddInput}>*</Button>
          </div>
          <div className='row'>
            <Button class= 'Button' handleClick={this.AddInput}>1</Button>
            <Button class= 'Button' handleClick={this.AddInput}>2</Button>
            <Button class= 'Button' handleClick={this.AddInput}>3</Button>
            <Button class= 'Op' handleClick={this.AddInput}>-</Button>
          </div>
          <div className='row'>
            <Button class= 'Button' handleClick={this.AddInput}>.</Button>
            <Button class= 'Button' handleClick={this.AddInput}>0</Button>

            <BClear  handleClear={() => this.setState({ input: "", previousOperand: "", currentOperand: "", proximo_numero: 'false', ponto: 'false'})} >AC</BClear>

            <Button class= 'Op' handleClick={this.Operation,this.AddInput} >+</Button>
          </div>
        </div>
      </header>

    </div>
    );
  };
}

export default App;
