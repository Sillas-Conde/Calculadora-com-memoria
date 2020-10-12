import React, { Component } from 'react';
import './App.css';



const Input = props => <div className= "Input">{props.input}</div>;
const InputM = props => <div className= "InputM">{props.input2}</div>;
const ButtonM = props => <div className= "ButtonM" onClick={() => props.handleClick(props.children)}>{props.children}</div>
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
      ponto: 'false',
      sinal: '',
      Memoria:'',
      input2: ''
      };
    this.registro = {
      Registro:[]
      }

  }
  
  

  AddInput = val => {

    if (val != '.') {
    this.setState({input: this.state.input + val});
    }


    if (val == '.' && this.state.ponto == 'false' && this.state.proximo_numero != 'true') {
      this.setState({input: this.state.input + val, currentOperand: this.state.currentOperand + val, ponto: 'true'});
    }
    if (val == '.' && this.state.ponto == 'false' && this.state.proximo_numero == 'true') {
      this.setState({input: this.state.input + val,previousOperand: this.state.previousOperand + val,ponto: 'true'});
    }


    if (  val != '=' && val !='*' && val !='÷' && val !='.' && this.state.proximo_numero == 'false' ) {
      this.setState({currentOperand: this.state.currentOperand + val,Memory: this.state.input + val})
    }
    if ((val == '-' || val == '+') && ( this.state.previousOperand == '' && this.state.proximo_numero == 'true')) {
      this.setState({previousOperand: this.state.previousOperand + val}) 
    }

    if ( (val == '+' || val == '-' || val =='*' || val =='÷') && (this.state.currentOperand != '-' && this.state.currentOperand != '+' && this.state.currentOperand != '' && this.state.operation =='')) {
      this.setState({operation: val, proximo_numero: 'true', ponto: 'false',Memory: this.state.input + val});
    }
    
    if (this.state.proximo_numero == 'true' && val != '-' && val != '+' && val != '=' && val != '.' && val != '*' && val != '÷') {
      this.setState({previousOperand: this.state.previousOperand + val}) 
      
      
    }

    if (val == '='){
      this.setState({Memory: this.state.input + val})
      
      if (this.state.operation == '+') {
      this.setState({input: parseFloat(this.state.currentOperand) + parseFloat(this.state.previousOperand)})
      this.setState({currentOperand: parseFloat(this.state.currentOperand) + parseFloat(this.state.previousOperand),previousOperand: '',operation: ''})
      }
      if (this.state.operation == '-') {
        this.setState({input: parseFloat(this.state.currentOperand) - parseFloat(this.state.previousOperand)})
        this.setState({currentOperand: parseFloat(this.state.currentOperand) - parseFloat(this.state.previousOperand),previousOperand: '',operation: ''})
      }
      if (this.state.operation == '*') {
        this.setState({input: parseFloat(this.state.currentOperand) * parseFloat(this.state.previousOperand)})
        this.setState({currentOperand: parseFloat(this.state.currentOperand) * parseFloat(this.state.previousOperand),previousOperand: '',operation: ''})
      }
      if (this.state.operation == '÷') {
        this.setState({input: parseFloat(this.state.currentOperand) / parseFloat(this.state.previousOperand)})
        this.setState({currentOperand: parseFloat(this.state.currentOperand) / parseFloat(this.state.previousOperand),previousOperand: '',operation: ''})
      }
      this.setState({previousOperand:'',operation:'',proximo_numero:'true', ponto:'false'})
    };

  }

  AddInput2 = val => {
    if (val == 'MS') {
      this.setState({Registro: this.registro.Registro.push(parseFloat(this.state.currentOperand))})

    }
    if (val == 'MC') {
      while (this.registro.Registro.length) {
        this.registro.Registro.pop()
      }
    }
    if (val == 'M+') {
      this.setState({Registro: this.registro.Registro.splice((this.registro.Registro.length) - 1,1,(parseFloat(this.registro.Registro[(this.registro.Registro.length) - 1]) + 1))})

    }
    if (val == 'MR') {
      this.setState({
        input: parseFloat(this.registro.Registro[(this.registro.Registro.length) - 1]),
        currentOperand: parseFloat(this.registro.Registro[(this.registro.Registro.length) - 1]),
        
      })
    }
    
  }
  

  Operation = val => {
    if (this.state.currentOperand != '' && this.state.operation == '') {
    this.setState({operation: val, proximo_numero: 'true', ponto: 'false'});
    }
  }

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
            <Button class= 'Op' handleClick={this.AddInput}>=</Button>
          </div>


          <div className='row'>
            <Button class= 'Button' handleClick={this.AddInput2}>MC</Button>
            <Button class= 'Button' handleClick={this.AddInput2}>MR</Button>
            <Button class= 'Button' handleClick={this.AddInput2}>M+</Button>
            <Button class= 'Op' handleClick={this.AddInput2}>MS</Button>
          </div>
          <div className='row'>
            <Button class= 'Button' handleClick={this.AddInput}>7</Button>
            <Button class= 'Button' handleClick={this.AddInput}>8</Button>
            <Button class= 'Button' handleClick={this.AddInput}>9</Button>
            <Button class= 'Op' handleClick={this.Operation,this.AddInput}>÷</Button>
          </div>
          <div className='row'>
            <Button class= 'Button' handleClick={this.AddInput}>4</Button>
            <Button class= 'Button' handleClick={this.AddInput}>5</Button>
            <Button class= 'Button' handleClick={this.AddInput}>6</Button>
            <Button class= 'Op' handleClick={this.Operation,this.AddInput}>*</Button>
          </div>
          <div className='row'>
            <Button class= 'Button' handleClick={this.AddInput}>1</Button>
            <Button class= 'Button' handleClick={this.AddInput}>2</Button>
            <Button class= 'Button' handleClick={this.AddInput}>3</Button>
            <Button class= 'Op' handleClick={this.Operation,this.AddInput}>-</Button>
          </div>
          <div className='row'>
            <Button class= 'Button' handleClick={this.AddInput}>.</Button>
            <Button class= 'Button' handleClick={this.AddInput}>0</Button>

            <BClear  handleClear={() => this.setState({ Memory: "",input: "", previousOperand: "", currentOperand: "", proximo_numero: 'false', ponto: 'false',operation: ''})} >AC</BClear>

            <Button class= 'Op' handleClick={this.Operation,this.AddInput} >+</Button>
          </div>
          
        </div>
        <div className= 'Memoria' >
          <InputM input2={this.registro.Registro[(this.registro.Registro.length) - 1]}></InputM>
          <div className='Linha'>
            <ButtonM handleClick={() => this.registro.Registro.splice(((this.registro.Registro.length) - 1),1)}>MC</ButtonM>
            <ButtonM handleClick={()  => this.setState({
              input: parseFloat(this.registro.Registro[(this.registro.Registro.length) - 1]),
              currentOperand: parseFloat(this.registro.Registro[(this.registro.Registro.length) - 1])})}>MR</ButtonM>
          </div>
          <InputM input2={this.registro.Registro[(this.registro.Registro.length) - 2]}></InputM>
          <div className='Linha'>
            <ButtonM handleClick={() => this.registro.Registro.splice(((this.registro.Registro.length) - 2),1)}>MC</ButtonM>
            <ButtonM handleClick={()  => this.setState({
              input: parseFloat(this.registro.Registro[(this.registro.Registro.length) - 2]),
              currentOperand: parseFloat(this.registro.Registro[(this.registro.Registro.length) - 2])})}>MR</ButtonM>
          </div>
          <InputM input2={this.registro.Registro[(this.registro.Registro.length) - 3]}></InputM>
          <div className='Linha'>
            <ButtonM handleClick={() => this.registro.Registro.splice(((this.registro.Registro.length) - 3),1)}>MC</ButtonM>
            <ButtonM handleClick={()  => this.setState({
              input: parseFloat(this.registro.Registro[(this.registro.Registro.length) - 3]),
              currentOperand: parseFloat(this.registro.Registro[(this.registro.Registro.length) - 3])})}>MR</ButtonM>
          </div>
          <InputM input2={this.registro.Registro[(this.registro.Registro.length) - 4]}></InputM>
          <div className='Linha'>
            <ButtonM handleClick={() => this.registro.Registro.splice(((this.registro.Registro.length) - 4),1)}>MC</ButtonM>
            <ButtonM handleClick={()  => this.setState({
              input: parseFloat(this.registro.Registro[(this.registro.Registro.length) - 4]),
              currentOperand: parseFloat(this.registro.Registro[(this.registro.Registro.length) - 4])})}>MR</ButtonM>
          </div>
          
          
        </div>
      </header>

    </div>
    );
  };
}

export default App;
