import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import instance from './axios';
import jsonData from './response.json';
import './Stocks.css';



function Stocks() {
  const [coinData, setCoinData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('asc');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const filteredData = jsonData.filter((coin) => coin.type_is_crypto === 1);
    setCoinData(filteredData);

  }, []);

  //you can use the instance component from axios to get COIN API realtime data like so: 
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await instance.get();
//       const data = response.data.data;
//       const filteredData = data.filter((coin) => coin.type_is_crypto === 1);
//       setCoinData(filteredData);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   fetchData();
// }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortType(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterType(event.target.value);
  };

  const filteredData = coinData.filter((coin) => {
    
    if (filterType === 'all' ) {
      return true;
    } else if (filterType === 'top') {
      return coin.price_usd > 100;
    } else if (filterType === 'bottom' ) {
      return coin.price_usd < 1;
    }
  }).filter((coin) => {
    return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    if (sortType === 'asc') {
      return a.price_usd - b.price_usd;
    } else if (sortType === 'desc') {
      return b.price_usd - a.price_usd;
    }
  });

  return (
    <>
    <br/>
    <br/>
    <br/>
      <div className='SearchBar'>
        <input className='SearchBar' type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearch} />
        <select className='SearchBar' value={sortType} onChange={handleSort}>
          <option placeholder= 'asc'  value="asc">Sort by price (low to high)</option>
          <option placeholder= 'desc' value="desc">Sort by price (high to low)</option>
        </select>
        <select className='SearchBar' value={filterType} onChange={handleFilter}>
          <option placeholder= 'all' value="all">All</option>
          <option placeholder= 'top' value="top">Top coins ({'>'}$100)</option>
          <option placeholder= 'bottom' value="bottom">Bottom coins ({'<'}$1)</option>
        </select>
      </div>
      <table className='styled-table'>
        <thead className='styled-table thead th'>
          <tr>
            <th>Name</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody className='styled-table tbody td'>
          {filteredData.map((coin) => (
            coin.price_usd>-1 &&
            
            <tr key={coin.asset_id}>
              <td>{coin.name}</td>
              <td>
                { "$"+parseFloat(coin.price_usd).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Stocks;

