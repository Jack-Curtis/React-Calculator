import React, { Component } from 'react';
import '../App.css';

class ButtonWindow extends Component {
  renderRows(rows){
    return rows.map(row => <div className="row">{this.renderBtns(row)}</div>)
  }
  
  changeStateBind(btn){
    return(
      this.props.changeState.bind(this,btn, btn.val)
    );
  }

  generateButton(className, value, btn){
    return (
      <button 
        className={className} 
        onClick={this.changeStateBind(btn)} 
        key ={btn.symbol}>
          {value}
      </button>
    );
  }

  renderBtns(btns){
    return btns.map(btn => {
      var btnLabel = btn.val;

        if (btn.val === 'equals'){
          var className = 'equals'
        } else if (btn.val === 0){
          className = 'zeroBtn'
        } else if ((btn.val === 'multiply') || 
        (btn.val === 'clear') || 
        (btn.val === 'clear_all') || 
        (btn.val === 'divide')) {
          className = 'black'
        } else {
          className = ''
        }

        if (btn.type === 'operator'){
          btnLabel = btn.symbol
        }

      return(
        <> 
          {this.generateButton(className, btnLabel, btn)}
          </>
        );
    });
  }

  render(){
    return(
    <div className="Buttons">
      {this.renderRows([
        [
          {type:'operator', val:'clear_all', symbol:'AC'},
          {type:'operator', val:'clear', symbol:'C'},
          {type:'operator', val:'divide', symbol:'/'},
          {type:'operator', val:'multiply',symbol:'X'}
        ],
        [
          {type:'num', val:'7'},
          {type:'num', val:'8'},
          {type:'num', val:'9'},
          {type:'operator', val:'minus', symbol: '-'}
        ],
        [
          {type:'num', val:'4'},
          {type:'num', val:'5'},
          {type:'num', val:'6'},
          {type:'operator', val:'plus', symbol: '+'}
        ],
        [
          {type:'num', val:'1'},
          {type:'num', val:'2'},
          {type:'num', val:'3'},
          {type:'num', val:null}
        ],
        [
          {type:'num', val:0},
          {type:'operator', val:'point', symbol: '.'},
          {type:'num', val:null},
          {type:'operator', val:'equals', symbol: '='}
        ]
      ])}
    </div>
    );
  };
};

export default ButtonWindow