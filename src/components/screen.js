import React, { Component } from 'react';
import '../App.css';

class Screen extends Component {
  render(){
    return (
      <div className="Screen">
        <h1>{this.props.state.latestVal}</h1>
      </div>
    );
  };
}

export default Screen;