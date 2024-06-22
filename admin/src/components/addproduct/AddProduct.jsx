import React from "react";
import './addproduct.css'; 
import image_upload from '../../assets/image_upload.png';
function AddProduct() {
  const [pic,setPic]=React.useState(false);
  const [store,setStore]=React.useState({
    name:"",
    category:"",
    new_price:"",
    old_price:"",
    image:""
  })
  const showimage=(e)=>{
setPic(e.target.files[0]);

  }
  const datahandler=(e)=>{
  setStore({...store,[e.target.name]:e.target.value})
 
  }
  const add_data=async()=>{
    console.log(store);
    let responseData;
    let product=store;
    let formData=new FormData();
    formData.append('product',pic)
    await fetch('http://localhost:4000/upload',{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data});
 if(responseData.success)
  {
    product.image=responseData.image_url
    await fetch('http://localhost:4000/addproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
       'Content-Type':'application/json',
      },
      body:JSON.stringify(product),


    }).then((resp)=>resp.json().then((data)=>{
      data.success?alert("product added"):alert("failed")
    }))
  }

  }

    return (
        <div className="add-product">
            <div className="add-fields">
                <p>Product Title</p>
                <input value={store.name} onChange={datahandler}type="text" name="name" placeholder="Type title" />
            </div>
           <div className="add-product-price">
            <div className="add-fields">
              <p>Price</p>
              <input  value={store.old_price} onChange={datahandler} type="text" name="old_price" placeholder="Type here"/>
              </div>
              <div className="add-fields">
              <p>New offer</p>
              <input  value={store.new_price} onChange={datahandler} type="text" name="new_price" placeholder="Type here"/>
            </div>
           </div>
<div className="add-fields">
  <p>Product Category</p>
  <select  value={store.category} onChange={datahandler}name="category" className="add-selector">
    <option value="women">Women</option>
    <option value="men">Men</option>
    <option value="kid">Kids</option>
  </select>
</div>
<div className="add-fields uploader">
  <label htmlFor="file-input">
    <img src={pic?URL.createObjectURL(pic):image_upload} alt="uploader" />
  </label>
  <input onChange={showimage} type="file" name='image' id='file-input' hidden/>
  <p>{pic?"":"upload here"}</p>
</div>
<button onClick={()=>{add_data()}}className="add-image-btn">ADD</button>
        </div>
    );
}
export default AddProduct;