import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/Context/Shopcategory';
import Footer from './components/footer/footer'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
       
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/men' element={<ShopCategory category="men"/>}/>
          <Route path='/women' element={<ShopCategory category="women"/>}/>
          <Route path='/kids' element={<ShopCategory category="kid"/>}/>
          <Route path="/login" element={<Login/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
         
          </Route>
          <Route path='/cart' element={<Cart/>}/>
         </Routes>
        <Footer/>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
