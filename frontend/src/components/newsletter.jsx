import React from "react";
import './newsletter.css'
const Newsletter=()=>{
return(
  <div className="news">
    <h1>GET EXCLUSIVE OFFERS</h1>
    <p>SUBSCRIBE TO OUR NEWSLETTER AND STAY UPDATED</p>
   <div>
    <input type="email" placeholder='Enter Your Email Id'></input>
    <button>Subscribe</button>
    </div>
  </div>
);
}
export default Newsletter;