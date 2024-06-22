import React from "react";
import './listproduct.css'
import remove from '../../assets/remove.png'

function Listproduct() {
  const [allProducts, setAllproduct] = React.useState([]); // Correct use of useState

  const fetchdata = async () => {
    try {
      const res = await fetch('http://localhost:4000/allproducts');
      const data = await res.json();
      setAllproduct(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  React.useEffect(() => {
    fetchdata();
  }, []);

  const remove_product=async(id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
    await fetchdata();
  }
  return (
    <div className="list-product">
      <h1>All Products</h1>
      <div className="allproducts-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-product-all">
        <hr />
        {allProducts.map((product, index) => {
          return<>
            <div key={index} className="allproducts-main listproduct-format">
              <img src={product.image} alt="" className="img1-listproduct" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_product(product.id)}} src={remove} alt="remove" className="remove-icon" />
            </div>
            <hr/>
            </>
        })}
      </div>
    </div>
  );
}

export default Listproduct;
