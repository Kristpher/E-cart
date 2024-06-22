import React from "react";
import Items from "./Itemsfile/Items";
import './popular.css';

function Popular() {
  const [pop,setPop]=React.useState([]);
  React.useEffect(()=>{
 fetch('http://localhost:4000/popular').then((response)=>response.json()).then((data)=>setPop(data));
  },[])
  return (
    <div className="container popular">
     <h1 className="write">Popular Collections</h1>
     
      <div className="pics">
        {
          pop.map((item, index) => (
            <Items 
              key={index}
              id={item.id}
              brand={item.brand_name} 
              name={item.name} 
              image={item.image} 
              newp={item.new_price} 
              oldp={item.old_price}
            />
          ))
        }
      </div>
    </div>
  );
}

export default Popular;
