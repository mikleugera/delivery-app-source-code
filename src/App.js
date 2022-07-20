import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { compose } from 'redux';
import './App.css';
import {Navbar} from './components/navbar';
import {Shop} from './components/shops.container';
import {ShoppingCard} from './components/shopping_card.container';

class App extends React.Component{
  render() {
      return (
          <div className="app-wrapper">
              <Navbar/>
              <div className="wrapper-content">
                  <Routes>               
                      <Route exact path='/shop' element={<Shop/>}/>
                      <Route exact path='/shopping_cart' element={<ShoppingCard/>}/>
                      <Route path="/" element={<Navigate to="/shop" />}/>
                  </Routes>
              </div>
          </div>
      )
  }
}

export default compose()(App);
