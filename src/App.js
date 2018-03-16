// // import React, { Component } from 'react';
// import React from 'react';
// import { Provider, connect } from 'react-redux'
// import { createStore} from 'redux'

// import './App.css';


// class Counter extends React.Component {

//   increment = () => {
//   	this.props.dispatch({ type: 'INCREMENT' });
//   }

//   decrement = () => {
//   	this.props.dispatch({ type: 'DECREMENT' });
//   }

//   render() {
//     return (
//       <div>
//         <h2>Counter</h2>
//         <div>
//           <button onClick={this.decrement}>-</button>
//           <span>{this.props.count}</span>
//           <button onClick={this.increment}>+</button>
//         </div>
//       </div>
//     )
//   }
// }

// function mapStateToProps(state) {
//   return {
//     count: state.count
//   };
// }


// // const App = () => (<h1><Counter /></h1>);

// // connect(mapStateToProps)(Counter);
// const Wawa = connect(mapStateToProps)(Counter);


// const initialState = {
//   count: 0
// };

// function reducer(state = initialState, action) {
//   switch(action.type) {
//     case 'INCREMENT':
//       return {
//         count: state.count + 1
//       };
//     case 'DECREMENT':
//       return {
//         count: state.count - 1
//       };
//     default:
//       return state;
//   }
// }

// const store = createStore(reducer);

// const App = () => (
//   <Provider store={store}>
//     <Wawa />
//   </Provider>
// );

// export default App;



import { Provider, connect } from 'react-redux'
import { createStore} from 'redux'

import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import 'bulma/css/bulma.css';
import './App.css';

function Active(props){
  const activeRows = props.items
    .map((item, index) =>(item.completed ?
      null
      :
      <tr>
        <th>
          <button className='button is-small is-warning' style={{marginRight: 12 + 'px'}} key={index} id={index} onClick={props.completeTask}>
            +
          </button>
          {item.title}
        </th>
        <th>
          <button className='button is-small is-danger is-pulled-right' style={{marginLeft: 50 + 'px'}} id={index} onClick={props.deleteItem}>
            x
          </button>
        </th>
      </tr>)
    ); 
  return (
    <tbody>
      {activeRows}
    </tbody>
    );
}

function Completed(props){
  const completedRows = props.items
    .map((item, index) =>(item.completed ?
      <tr>
        <th>
          <button className='button is-small is-primary' style={{marginRight: 12 + 'px'}} id={index} onClick={props.activateTask}>
            ✓
          </button>
          {item.title}
        </th>
        <th>
          <button className='button is-small is-danger is-pulled-right' style={{marginLeft: 50 + 'px'}} id={index} onClick={props.deleteItem}>
            x
          </button>
        </th>
      </tr>
      :
      null
      )
    ); 
  return (
    <tbody>
      {completedRows}
    </tbody>
    );
}

function All(props){
  const rows = props.items.map((item, index) => (
      <tr>
        <th>
          {item.completed ?  <button className='button is-small is-primary' style={{marginRight: 12 + 'px'}} id={index} onClick={props.toggleTask}>
              ✓
            </button>
            :
            <button className='button is-small is-warning' style={{marginRight: 12 + 'px'}} id={index} onClick={props.toggleTask}>
              +
            </button>
          }
          {item.title}
        </th>
        <th>
          <button className='button is-small is-danger is-pulled-right' style={{marginLeft: 50 + 'px'}} id={index} onClick={props.deleteItem}>
            x
          </button>
        </th>
      </tr>)
    ); 
  return (
    <tbody>
      {rows}
    </tbody>
    );
}

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      item: {
        title: "",
        completed: false},
      items: []
    };
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.completeAll = this.completeAll.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  addItem(){
    const items = Object.assign(this.state.items, []);
    if (this.state.item.title) items.push(this.state.item);
    this.setState({items: items, item: Object.assign({}, this.state.item, {title: ''})});
  }

  handleKeyPress(e){
    if(e.key == 'Enter') this.addItem();
  }

  handleChange(e){
     this.setState({item: Object.assign({}, this.state.item, {title: e.target.value})});
  }

  deleteItem(e){
    const items = Object.assign(this.state.items, []);
    items.splice(e.target.id, 1);
    this.setState(items: items);
  }

  deleteAll(){
    this.setState({items: []});
  }

  toggleTask(e){
    const items = Object.assign([], this.state.items, this.state.items[e.target.id].completed = !this.state.items[e.target.id].completed);
    this.setState(items: items);
  }

  completeAll(e){
    const items = Object.assign([], this.state.items);
    const compltedItems = items.map(item => item.completed = true);
    this.setState(items: compltedItems);
  }

  render(){
    const items = this.state.items;
    const item = this.state.item;
    return (
      <Router>
      <div>
        <div className="level">
          <div className='level-item has-text-centered' style={{marginLeft:22+'%', marginRight:22+'%'}}>
          <h1 class="title is-1">MY TODOS</h1>
          </div>
        </div>
        <div className="level">
          <div className='level-item has-text-centered' style={{marginLeft:22+'%', marginRight:22+'%'}}>
            <table className='table is-fullwidth'>  
              
                <tr>
                  <th>
                    <input className="input" type="text" placeholder="Add item.." value={item.title} onChange={this.handleChange} onKeyPress={this.handleKeyPress}></input>
                  </th>
                  <th>
                  <button className="button is-primary is-fullwidth" onClick={this.addItem}>Add Item</button>
                  </th>
                </tr>

                <Route exact path="/" component={() => (<All items={items} toggleTask={this.toggleTask} deleteItem={this.deleteItem}/>)}/>
                <Route exact path="/completed" component={() => (<Completed items={items} activateTask={this.toggleTask} deleteItem={this.deleteItem} />)}/>
                <Route exact path="/active" component={() => (<Active items={items} completeTask={this.toggleTask} deleteItem={this.deleteItem} />)}/>

                <th>
                  <div className="field is-grouped" style={{padding:.75+'em'}}>
                    <p className='control'><button className='button is-white'><NavLink exact to="/" style={{color: "#0a0a0a", padding: 2+ 'px'}} activeStyle={{fontWeight: "bold"}}>All ({items.length})</NavLink></button></p>
                    <p className='control'><button className='button is-white'><NavLink to="/active" style={{color: "#0a0a0a"}} activeStyle={{fontWeight: "bold"}}>Active {items.filter(item => item.completed == false).length})</NavLink></button></p>
                    <p className='control'><button className='button is-white'><NavLink to="/completed" style={{color: "#0a0a0a"}} activeStyle={{fontWeight: "bold"}}>Completed ({items.filter(item => item.completed).length})</NavLink></button></p>
                    <p className='control'><button className='button is-primary is-inverted' style={{fontWeight: "bold"}} onClick={this.completeAll}>Complete All</button></p>
                  </div>
                </th>
                <th>
                  <div className="field is-grouped" style={{padding:.75+'em'}}>
                    <p className='control'><button className='button is-danger is-inverted is-pulled-right' style={{fontWeight: 'bold'}} onClick={this.deleteAll}>Remove All</button></p>
                  </div>
                </th>
            </table>
          </div>
        </div>
      </div>
      </Router>
      );
  }
}

const initialState = {
  todos:[]
};

function reducer(state = [], action) {
  switch(action.type) {
    case 'ADD_TODO':
      return [  
        ...state, 
        {
          title: action.title,
          completed: false
        }
      ];
    // case 'DECREMENT':
    //   return {
    //     count: state.count - 1
      // };
    default:
      return state;
  }
}

const store = createStore(reducer);
const a = store.dispatch({type:'ADD_TODO', title: "baba"});
console.log(store.getState());

export default App;

