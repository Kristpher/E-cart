import React from 'react';
import { Link } from "react-router-dom"; 
import './items.css'

const Items = (props) => {
  return (
    <div className="Item">
      <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt={props.name} /></Link>
      <h4>{props.brand}</h4>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="newp">{props.newp}</div>
        <div className="oldp">{props.oldp}</div>
      </div>
    </div>
  );
}

export default Items;
