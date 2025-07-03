import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [userId, setUserid] = useState("")
  const [password, setPassword] = useState("")
const navigate=useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName: userId, password: password })
      });
      const result = await response.json();
      console.log("result", result);

      if (result.success) {
        alert(result.message)
        sessionStorage.setItem("userName", userId);
        
        navigate('/dashboard',{state:{user:userId}});
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.log("Error", error);
      alert("Login Failed")
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <label htmlFor="userid">User ID:</label>
        <input type="text" name='userid' onChange={(e) => setUserid(e.target.value)} />
        <br /><br />
        <label htmlFor="password">Password :</label>
        <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
        <br /><br />
        <input type="submit" value="Login" />
      </form>
    </>
  )
}

export default Login;
