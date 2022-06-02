import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';


function App() {
  return (
      <Route>
        <div className="Aindexespp">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Link to="/">Home</Link>
            <Link to="/otherPage">Other Page</Link>
          </header>
          <div>
            <Router exactPath = '/' component={Fib} />
            <Router exactPath = '/otherPage' component={OtherPage} />
          </div>
        </div>
      </Route>
  );
}

export default App;
