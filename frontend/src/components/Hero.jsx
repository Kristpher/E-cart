import React from 'react';
import Coverone from'./objects/cover1.png'
import './Hero.css'
function Hero(){
  return(
  <div className="whole">
  <div className="left">
  <h1>Discover the Latest Collections
</h1>
<h4>Unveil our exclusive Spring/Summer 2024 Collection! Embrace the season with vibrant colors, luxurious fabrics, and cutting-edge designs that define contemporary elegance.</h4>
<button>Explore the Collection</button>
  </div>
  <div className="right">
 <img src={Coverone}/>
  </div>
  </div>
  );
}
export default Hero;