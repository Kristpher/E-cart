import React,{useContext} from "react";
import { ShopContext } from "./Context/Shopcontext";
import ProductShow from "./showproduct";
import {useParams} from 'react-router-dom';
import related_produ from '../components/objects/Assets/related_produ';
import Items from "../components/Itemsfile/Items";
import './css/Product.css'
const Product=()=>{
  const {all_product}=useContext(ShopContext);
  const {productId}=useParams();
  const product =all_product.find((e)=>e.id===Number(productId));
  return(
    <div className="product">
      <ProductShow product={product}/>
      <h1>Related Products</h1>
      <div className="selecteditems">
     {related_produ.map((item)=>(
      <Items id={item.id} image={item.image} name={item.name}/>

     ))}
     </div>
    </div>
  );
  
};
export default Product;
