import React from 'react';
import Hero from '../components/Hero';
import './css/shop.css';
import Popular from '../components/Popular';
import Offers from '../components/offers';
import Brand from '../components/brands';
import Newsletter from '../components/newsletter';



const Shop = () => {
  return (
    <div className="shop-container">
      <Hero />
      <Popular />
      <Offers/>     
     <Brand/>
     <Newsletter/>
    
    </div>
  );
}

export default Shop;
