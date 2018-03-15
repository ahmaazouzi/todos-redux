import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css'
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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
//     <Counter/>
//   </Provider>
// );




ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
