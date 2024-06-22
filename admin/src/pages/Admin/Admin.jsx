import React from 'react';
import './Admin.css';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import AddProduct from '../../components/addproduct/AddProduct';
import Listproduct from '../../components/listproduct/Listproduct';


const Admin = () => {
    return (
        <div className="admin">
            <Sidebar />
            <Routes>
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/listproduct" element={<Listproduct/>} />
            </Routes>
        </div>
    );
}

export default Admin;
