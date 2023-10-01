
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './Stocks.css';
import Stocks from './Stocks';

function App() {
  const [showStocks, setShowStocks] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showHome, setShowHome] = useState(false);

  const handleStocksClick = () => {
    setShowStocks(!showStocks);
    setShowWelcome(false);
    setShowHome(true)
  };
 
  const handleShowHome = () => {
    setShowWelcome(true);
    setShowStocks(false)
  }


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {showWelcome &&
            <img src={logo} className="App-logo" alt="logo" />
          }
          {showWelcome && (
            <div className='Welcome'>
              <h1>Welcome to the world of Crypto!</h1>

            </div>)}
          {showWelcome && (
            <button className="button-prices" onClick={handleStocksClick}>Get the latest prices</button>
          )}

          {showStocks && <Stocks /> }
          {showStocks &&  <button className="button" onClick={handleShowHome}>Home</button> }
          
        </header>

      </div>
    </Router>
  );
}

export default App;

