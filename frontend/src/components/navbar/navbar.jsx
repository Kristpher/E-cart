import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import './navbar1.css';
import cart from '../objects/logo/cart.jpeg';
import kart from '../objects/icon-kart.png';
import user from '../objects/user.jpeg';
import { ShopContext } from "../../Pages/Context/Shopcontext";

const Navbar = () => {
  const [nav, setNav] = React.useState("");
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login'); // Use navigate directly
  }
const {count}=React.useContext(ShopContext);

  return (
    <div className="Navbar">
      <div className="Icon">
        <img alt="logo" src={cart} />
        <h2>E-cart</h2>
      </div>
      <div className="Menu">
        <ul>
          <li onClick={() => setNav("Shop")}>
            <Link to="/" style={{ textDecoration: 'none' }}>Shop</Link>
            {nav === "Shop" ? <hr /> : null}
          </li>
          <li onClick={() => setNav("Men")}>
            <Link to="/men" style={{ textDecoration: 'none' }}>Men</Link>
            {nav === "Men" ? <hr /> : null}
          </li>
          <li onClick={() => setNav("Women")}>
            <Link to="/women" style={{ textDecoration: 'none' }}>Women</Link>
            {nav === "Women" ? <hr /> : null}
          </li>
          <li onClick={() => setNav("Kids")}>
            <Link to="/kids" style={{ textDecoration: 'none' }}>Kids</Link>
            {nav === "Kids" ? <hr /> : null}
          </li>
        </ul>
      </div>
      <div className="userstuffs">
        {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');
          window.location.replace('/')
        }}>logout</button>:  <button onClick={handleLoginClick} style={{ textDecoration: 'none' }}>
        Login
      </button>}
      
      <Link to="./cart">   <img className="iconone" alt="user" src={kart} /> </Link> 
  
      <div className="counter" style={{ background:count()?"red":"white"}}>
  {count()}
</div>

        <img className="iconuser" alt="user" src={user} />
      </div>
    </div>
  );
};

export default Navbar;