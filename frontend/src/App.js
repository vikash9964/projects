import React, { Component } from 'react';
import { Route,Router } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './App.css';
import { history } from './helpers';


class App extends Component {
  render() {
    return (     

      <div className="container">
      <Router history={history}>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} /></Router>
      
      </div>
    );
  }
}

export default App;