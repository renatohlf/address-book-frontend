import React, { Component } from 'react';
import './App.css';
import logo from './book-blue.svg';
import Login from './login/login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Login></Login>
        </header>
      </div>
    );
  }
}

export default App;
