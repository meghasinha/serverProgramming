import React, { Component } from 'react';
import moviesApp from './reducers/reducers';
import { createStore } from "redux";
import { Provider } from 'react-redux';
import MainView from './components/main-view/main-view';
import logo from './logo.svg';
import './App.css';

const store = createStore(moviesApp);

class App extends Component {
  render() {
    return (
       <Provider store={store}>
      <MainView/>
      </Provider>
    );
  }
}

export default App;
