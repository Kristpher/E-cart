import React, { useEffect } from "react";
export const ShopContext = React.createContext(null);

function getproduct() {
  let arr = {};
  for (let i = 0; i < 300 + 1; i++) {
    arr[i] = 0; 
  }
  return arr;
}

const ShopContextProvider = (props) => {
  const [prod, setProd] = React.useState(getproduct());
  const [all_product, setAll_product] = React.useState([]);
  
  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        setAll_product(data);
      });
      if (localStorage.getItem('auth-token')) {
        fetch('http://localhost:4000/getcart', {
          method: 'POST',
          headers: {
            Accept: 'application/json', 
            'auth-token': `${localStorage.getItem('auth-token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), 
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Cart Data:', data);
          setProd(data);
         
        })
        .catch((error) => console.error('Error:', error));
      }
      
  }, []);

  const [sum, setSum] = React.useState(0);

  const count = () => {
    let totalcount = 0;
    for (const item in prod) {
      if (prod[item] > 0) {
        totalcount += prod[item];
      }
    }
    return totalcount;
  };
  
  const calculateTotalSum = () => {
    let sum1 = 0;
    for (let i = 0; i < all_product.length; i++) {
      const product = all_product[i];
      if (prod[product.id] > 0) {
        sum1 += product.new_price * prod[product.id];
      }
    }
    setSum(sum1);
  };

  useEffect(() => {
    calculateTotalSum();
  }, [prod]);

  const addItem = (itemId) => {
    setProd((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
   

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId":itemId }),
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
    }
  };
  
  const deleteItem = (itemId) => {
    setProd((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId":itemId }),
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
    }
  };

  return (
    <ShopContext.Provider value={{ all_product, prod, addItem, deleteItem, sum, count }}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
