import React from "react";
import { ShopContext } from "./Context/Shopcontext";
import './cartfeatures.css';

function Cartfeatures() {
  const { all_product, prod, deleteItem, addItem, sum } = React.useContext(ShopContext);

  return (
    <div className="cart-main">
      <div className="Cartfeatures">
        <p>Product</p>
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Add</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (prod[e.id] > 0)
          return (
            <div key={e.id}>
              <div className="individual Cartfeatures">
                <img src={e.image} alt="pic" className="image-of-product" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="quantity-cart">{prod[e.id]}</button>
                <p>${(e.new_price * prod[e.id]).toFixed(2)}</p>
                <button
                  className="add-to-cart"
                  onClick={() => {
                    addItem(e.id);
                  }}
                >
                  +
                </button>
                <button
                  className="remove-from-cart"
                  onClick={() => {
                    deleteItem(e.id);
                  }}
                >
                  -
                </button>
              </div>
              <hr />
            </div>
          );
        return null;
      })}
      <div className="finalprocess">
      <div className="totalamount">
          <h1>Total Amount</h1>
        
          <hr />
          <div>
          <div className="subtotal">
            <p>Subtotal</p>
            <p>${sum.toFixed(2)}</p>
            
          </div>
          <hr />
          <div className="subtotal">
            <p>Shipping</p>
            <p>Free</p>
           
          </div>
          <hr />
          <div className="subtotal">
            <p>Total</p>
            <p>${sum.toFixed(2)}</p>
            
          </div>
         
          <button className="checkout">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartfeatures;