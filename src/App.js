import React, { Component } from 'react';
import './App.css';
import Shadow from "./components/shadow";
import Calculator from "./components/calculator";

class App extends Component {
  render(){
    return (
    <div className="container">
      <Calculator />
      <Shadow />
    </div>
    );
  }
}

export default App;