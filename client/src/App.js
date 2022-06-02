import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, route, Link } from 'react-router-dom';
import OtherPage from "./OtherPage";
import fib from "./Fib";


function App() {
  return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Link to="/">Home</Link>
            <Link to="/otherPage">Other Page</Link>
          </header>
          <div>
            <Router exactPath = '/' component={'Fib'} />
            <Router exactPath = '/otherPage' component={'OtherPage'} />
          </div>
        </div>
      </Router>
  );
}

export default App;
