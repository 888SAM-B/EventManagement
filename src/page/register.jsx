import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate();
  const url=import.meta.env.VITE_URL
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [userName,setUserName]=useState('')
  const [password,setPassword]=useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        userName,
        password
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Registration successful!');
      navigate('/login'); // Redirect to login page after successful registration
    } else {
      alert('Registration failed: ' + data.message);
    }
  }

  return (
    <>
      <h1>Register</h1>
      <form action="/" onSubmit={handleSubmit} >
      <label htmlFor="fistName">First Name</label>
        <input type="text" name="firstName" id="firstName" onChange={(e)=>{setFirstName(e.target.value)}} />
        <br /> <br />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" onChange={(e)=>{setLastName(e.target.value)}} />
        <br /> <br />
        <label htmlFor="fistName">User Name (E - Mail)</label>
        <input type="email" name="userName" id="userName" onChange={(e)=>{setUserName(e.target.value)}} />
        <br /> <br />
        <label htmlFor="password">Password Name</label>
        <input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} />
        <br /><br />
        <input type="submit" value="register" />
      </form>

     
    </>
  )
}

export default Register