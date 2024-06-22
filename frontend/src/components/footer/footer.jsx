import React from "react";
import './footer.css';
const Footer=()=>{
  const data=new Date();
  let year=data.getFullYear();
  return(
    <div className="footer">
       <div className="logoagain">
        <img src=""/>
        <h1>E-CART</h1>
       </div>
       <div className="navs">
        <p>Company</p>
        <p>Products</p>
        <p>Offices</p>
        <p>About</p>
        <p>Contact</p>
       </div>
       <div className="pics">
        <img/>
        <img/>
        <img/>

       </div>
       <div className="copyr">
        <p>Copyright@{year}-All Right Reserved</p>
       </div>
    </div>
   
  );
}
export default Footer;