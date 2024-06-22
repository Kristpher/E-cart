import React ,{useContext} from "react";
import './shopcategory.css'
import { ShopContext } from "./Shopcontext";
import dropdown_icon from '../../components/objects/Assets/dropdown_icon.png'
import Items from "../../components/Itemsfile/Items";

const ShopCategory =(props) =>{
  const {all_product}=useContext(ShopContext);
  return(
    <div className="shop-categ">
   <div className="indexsort">
    <p>
      <span>Showing 1-12 </span>
      of our 36 products
    </p>
    <div className="sort">
      Sort by<img src={dropdown_icon}/>
    </div>
   </div>
   <div className="shop-products">
    {all_product.map((item,index)=>{
     if(props.category===item.category){
      return<Items key={index} id={item.id} name={item.name} image={item.image} newp={item.new_price} oldp={item.old_price }/>
     }
     else
     return null;
})}
   </div>
  <div className="but">
    <button>Explore More</button>
  </div>
    </div>
  )
}
export default ShopCategory