import React from "react";
import './navbar.css';
import logo from '../../assets/logo/cart.jpeg'
import navprofile from '../../assets/men15.jpg'
function Navbar(){
  return(
    <div className="navbar">
      <div className="logorel">
     <img src={logo} alt="logo" className="weblogo" />
     <div className="texts">
     <h1 className="titlelogo">E-cart </h1>

     <h3 className="h3text">Admin Panel</h3>
     </div>
     </div>
     <img src={navprofile} alt="profile" className="adminprofile" />
  

    </div>
  );
}
export default Navbar;