// import React, { Component } from 'react';
import React from 'react';
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import './App.css';


class Counter extends React.Component {

  increment = () => {
  	this.props.dispatch({ type: 'INCREMENT' });
  }

  decrement = () => {
  	this.props.dispatch({ type: 'DECREMENT' });
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}


// const App = () => (<h1><Counter /></h1>);

// connect(mapStateToProps)(Counter);
const Wawa = connect(mapStateToProps)(Counter);


const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <Wawa />
  </Provider>
);

export default App;