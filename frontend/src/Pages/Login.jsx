import React from "react";
import {  useNavigate } from "react-router-dom"; 
import './css/login.css';
const Login=()=>{
  const navigate=useNavigate();

  const[formData,setFormData]=React.useState({
    password:"",email:""
  })
  const handle=()=>{
    navigate('/signup')
  }

const changehandler=(event)=>{
  setFormData({...formData,[event.target.name]:event.target.value})
}
  const loginpage =async()=>{
    console.log("Lofin function executed",formData);
    let responsedata;
    await fetch('http://localhost:4000/login',{
      method: 'POST',
      headers: {
        Accept: 'application/json',  // Changed to 'application/json'
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responsedata = data);

    if (responsedata.success) {
      localStorage.setItem('auth-token', responsedata.token);
      window.location.replace("/");
    }
    else{
      alert(responsedata.errors)
    }
  }
  return(
    <div className="forall">
   <div className="log">
    <div className="logostuffs"></div>
    <div className="signin">
    <div className="allpage">
    <h1>Login</h1>
   <input name="email"  value={formData.email} onChange={changehandler}type="email" placeholder="email"/>
    <input name="password"  value={formData.password} onChange={changehandler} type="password" placeholder="password"/>
    </div>
    <div className="extra">
    <button onClick={loginpage} style={{ textDecoration: 'none' }}>Submit</button>
    </div>
    <div className="e">
    <p>forgot password?</p>
    <p>New here? <span onClick={handle} style={{ cursor: 'pointer', color: 'blue' }}>Sign up</span></p>
    </div>
    </div>
    </div>
    </div>
  );

}
export default Login;