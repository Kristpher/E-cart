import React from "react";
import './css/signup.css';
import {  useNavigate } from "react-router-dom";
const Signup = () => {
  const [signdata, setSigndata] = React.useState({
    username: "",
    email: "",
    password: ""
  });

  const changeh = (e) => {
    setSigndata({ ...signdata, [e.target.name]: e.target.value });
  }

  const signuppage = async () => {
    console.log("Signup Function Executed", signdata);
    let responsedata;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',  // Changed to 'application/json'
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signdata),
    }).then((response) => response.json()).then((data) => responsedata = data);

    if (responsedata.success) {
      localStorage.setItem('auth-token', responsedata.token);
      window.location.replace("/");
    }
    else{
      alert(responsedata.errors)
    }
  }
  const navigate=useNavigate();
  const handle=()=>{
    navigate('/login')
  }

  return (
    <div className="for">
      <div className="sign">
        <div className="logostuffs"></div>
        <div className="signup">
          <div className="all">
            <h1>Sign Up</h1>
            <input
              name="email"  // Added name attribute
              onChange={changeh}
              value={signdata.email}
              type="email"
              placeholder="Email"
              className="input-field"  // Updated to use className
            />
            <input
              name="password"  // Added name attribute
              onChange={changeh}
              value={signdata.password}
              type="password"
              placeholder="password"
              className="input-field"  // Updated to use className
            />
            <input
              name="username"  // Added name attribute
              onChange={changeh}
              value={signdata.username}
              type="text"
              placeholder="username"
              className="input-field"  // Updated to use className
            />
          </div>
          <div className="extra">
            <button onClick={signuppage} style={{ textDecoration: 'none' }}>Submit</button>
          </div>
          <div className="e">
            <p>forgot password?</p>
            <p>Already have an account? <span onClick={handle} style={{ cursor: 'pointer', color: 'blue' }}>Login</span> </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
