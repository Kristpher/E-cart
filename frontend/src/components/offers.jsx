import React from 'react';
import './offers.css';
import pic1 from './objects/happy.jpg'
function Offers(){
return(
<div className="offer">
  <div className="leftpart">
  <h1 className="main-heading">EXCLUSIVE OFFERS</h1>
  <p>GET THE BEST DEALS AND DISCOUNDS</p>
  <button>CHECK NOW</button>
  </div>
  <div className="rightpart">
    <img src={pic1}/>
  </div>
</div>

);

}
export default Offers;