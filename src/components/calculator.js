import React, { Component } from 'react';
import '../App.css';
import Screen from "./screen";
import ButtonWindow from "./button-window"

class Calculator extends Component {
  
  // Sets up the initial state
  constructor(props) {
    super(props);
    this.state = {
      firstVal: '0', // Stores the first value for the sum
      latestVal: '0', // Stores the second value for the sum
      operator: null, // Stores the operator for the sum
      latestButtonType: null, // To handle multi digit numbers
      latestButtonVal: null // To handle repeated = presses in a row
    };

    this.operators = [
      {type: 'clear_all', symbol: 'AC'},
      {type: 'clear', symbol: 'C'},
      {type: 'divide', symbol: '/'},
      {type: 'multiply', symbol: 'X'},
      {type: 'minus', symbol: '-'},
      {type: 'plus', symbol: '+'},
      {type: 'equals', symbol: '='},
      {type: 'point', symbol: '.'}
    ];
  }

  multiply(latestVal) {
    if (latestVal === "equals"){
      let ans = (Number(this.state.latestVal) *
        (Number(this.state.latestVal) /
        Number(this.state.firstVal))).toString();   
      var first = this.state.latestVal.toString()
      ans = ans.toString()
      this.setState({
        firstVal: first, 
        latestVal: ans
      });
    }
    else {
      let ans = (Number(this.state.latestVal) * Number(this.state.firstVal));
      ans = ans.toString()
      this.setState({ latestVal: ans });
    }
  }

  divide(latestVal){
    if (latestVal === "equals"){ // Handles repeated = presses
      let ans = this.state.latestVal / this.state.firstVal
      ans = ans.toString()
      this.setState({latestVal: ans});
    } else {
      let ans = this.state.firstVal / this.state.latestVal;
      ans = ans.toString()
      this.setState({ firstVal: this.state.latestVal, latestVal: ans });
    }
  }

  plus(latestVal){
    if (latestVal === "equals"){
      let ans = Number(this.state.latestVal) + 
                (Number(this.state.latestVal) - 
                 Number(this.state.firstVal)
                )
      ans = ans.toString()
      this.setState({firstVal: this.state.latestVal, latestVal: ans});
    }
    else{
      let ans = Number(this.state.latestVal) + Number(this.state.firstVal);
      console.log(ans)
      ans = ans.toString()
      this.setState({ latestVal: ans });
    }
  }

  minus(latestVal){
    if (latestVal === "equals"){ // Handles repeated = presses
      var ans = Number(this.state.latestVal) - Number(this.state.firstVal);
      ans = ans.toString()
      this.setState({latestVal: ans});
    } else {
      let ans = this.state.firstVal - this.state.latestVal;
      ans = ans.toString()
      this.setState({firstVal: this.state.latestVal, latestVal: ans});
    }
  }

  changeState(btn, btnValue){ // Handles button presses
    var latestVal = this.state.latestButtonVal;
    var latestBtnType = this.state.latestButtonType;

    if (btn.type === "operator"){
      switch (btnValue){
        case 'equals':
          setTimeout(() => {
            switch(this.state.operator) {
              case 'multiply': this.multiply(latestVal); break;
              case 'divide': this.divide(latestVal); break;
              case 'plus': this.plus(latestVal); break;
              case 'minus': this.minus(latestVal); break;
            }
          }, 1);
          break;
        case 'clear':
          this.setState({latestVal: this.state.firstVal});
          break;
        case 'clear_all':
          this.setState({firstVal: '0', latestVal: '0', operator: null});
          break;
        case "point":
          if (latestBtnType === 'num'){
            var ans = latestVal.toString() + '.';
            this.setState({latestVal: ans, latestButtonType: 'num'});
          }
          break;
        default:
          this.setState({operator: btnValue});
          break;
      }
      setTimeout(()=>{
        this.setState({latestButtonVal: btnValue});
      },1)
      this.setState({latestButtonType: 'op'});

    } else { // Number pressed
        this.setState({latestButtonType: 'num', latestButtonVal: btnValue});
        if (latestBtnType === 'num'|| latestVal === 0){
          let ans = this.state.latestVal.toString() + btnValue.toString()
          this.setState({latestVal: ans, latestButtonType: 'num'});
        }
        else if (latestBtnType === 'op' && latestVal === 'point'){
          var temp = this.state.latestVal + btnValue;
          this.setState({latestVal: temp})
        } else {
          console.log('hi')
            this.setState({firstVal: this.state.latestVal,latestVal: btnValue})
        }
    }
    setTimeout(() => {
      console.log(this.state);
    }, 1)
  }
  render(){
    return (
      <div className="Calculator">
        <Screen state={this.state}/>
        <ButtonWindow changeState={this.changeState.bind(this)}/>
      </div>
    );
  };
};

export default Calculator