import React from "react";
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_icon from '../../assets/add_new.png';
import select_icon from '../../assets/select.png';

function Sidebar() {
    return (
        <div className="sidebar">
            <Link to="/addproduct" style={{ textDecoration: "none" }}>
                <div className="items-side">
                    <img src={add_icon} alt="Add product icon" className="product-icon" />
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to="/listproduct" style={{ textDecoration: "none" }}>
                <div className="items-side">
                    <img src={select_icon} alt="Product list icon" className="select-icon" />
                    <p>Product List</p>
                </div>
            </Link>
        </div>
    );
}

export default Sidebar;
