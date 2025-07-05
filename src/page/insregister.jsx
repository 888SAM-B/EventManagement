import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InsRegister = () => {
  const navigate = useNavigate();
  const url=import.meta.env.VITE_URL
  const [insName,setInsName] = useState('')
  const [userName,setUserName]=useState('')
  const [number,setNumber]=useState(null)
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password != confirmPassword){
        alert("Password doesnot match")
        return ;
    }
    const response = await fetch(`${url}/insregister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        insName,
        number,
        userName,
        password
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Registration successful!');
      navigate('/orglogin'); // Redirect to login page after successful registration
    } else {
      alert('Registration failed: ' + data.message);
    }
  }

  return (
    <>
     
      <h1>Organization Register</h1>
      <form action="/" onSubmit={handleSubmit} >
      <label htmlFor="fistName">Organization Name</label>
        <input type="text" name="firstName" id="firstName" onChange={(e)=>{setInsName(e.target.value)}} />
        <br /> <br />
        <label htmlFor="userName">Contact Number</label>
        <input type="number" name="contact" id="contact" onChange={(e)=>{setNumber(e.target.value)}} />
        <br /> <br />
        <label htmlFor="userName">User Name (E - Mail)</label>
        <input type="email" name="userName" id="userName" onChange={(e)=>{setUserName(e.target.value)}} />
        <br /> <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} />
        <br /><br />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br /><br />
        <input type="submit" value="register" />
      </form>

     
    </>
  )
}

export default InsRegister