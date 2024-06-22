import React, { useContext } from "react";
import star_icon from '../components/objects/Assets/star_icon.png';
import star_dull_icon from '../components/objects/Assets/star_dull_icon.png';
import './css/productshow.css';
import { ShopContext } from "./Context/Shopcontext";

const ProductShow = (props) => {
  const { product } = props;
  const { addItem } = useContext(ShopContext);

  if (!product || !product.image) {
    return <div>Loading...</div>; // Fallback UI when product is not available or image is missing
  }

  return (
    <div className="mainpage">
      <div className="productpage">
        <div className="prod-left">
          <div className="small-img-left">
            <img src={product.image} alt="Product" />
            <img src={product.image} alt="Product" />
            <img src={product.image} alt="Product" />
            <img src={product.image} alt="Product" />
          </div>
          <div className="bigimage">
            <img src={product.image} alt="Product" />
          </div>
        </div>
        <div className="prod-right">
          <h1>{product.name}</h1>
          <div className="rating">
            <img src={star_icon} alt="Star" />
            <img src={star_icon} alt="Star" />
            <img src={star_icon} alt="Star" />
            <img src={star_icon} alt="Star" />
            <img src={star_dull_icon} alt="Star" />
            <p>(121)</p>
          </div>
          <div className="pmoney">
            <p className="newmoney">${product.new_price}</p>
            <p className="oldmoney">${product.old_price}</p>
          </div>
          <p className="prod-des">Right now you don't have to read this, I have no details about the product</p>
          <div className="selection">
            <h1>Select Size</h1>
            <div className="sizes">
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
              <div>XLL</div>
            </div>
          </div>
          <button onClick={() => { addItem(product.id) }}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default ProductShow;
