import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const organizationLogin = () => {
  const [userId, setUserid] = useState("")
  const [password, setPassword] = useState("")
  const [institution, setInstitution] = useState("")
  const [institutions,setInstitutions]=useState([])
const navigate=useNavigate();

  const fetchOrgs =async ()=>{
    try{
      const response = await fetch(`${import.meta.env.VITE_URL}/fetchOrg`,{
        method:"GET",
        headers:{
          "content-Type":"application/json"
        },
      })
      const res=await response.json()
      console.log(res.orgNames)
      setInstitutions(res.orgNames)
    }catch(error){
      console.log("Error : ",error);
    }
  }

  useEffect(() => {
    fetchOrgs();
    // eslint-disable-next-line
  }, [])
  

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/inslogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ institution:institution, userName: userId, password: password })
      });
      const result = await response.json();
      console.log("result", result);

      if (result.success) {
        alert(result.message)
        sessionStorage.setItem("userName", userId);
        navigate('/orgdashboard',{state:{user:userId}});
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
      <h1>Organization Login</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        
        <label htmlFor="institution">Organization name :</label>
        <select name="ins" id="ins" onChange={(e)=>{setInstitution(e.target.value)}} >
          <option value=""  >Select Institution</option>
          {institutions.map((ins,idx)=>{
            return <option key={idx} value={ins} >{ins}</option>
          })}
        </select>
          <br /><br />

        <label htmlFor="userid">User ID (Email) :</label>
        <input type="email" name='userid' onChange={(e) => setUserid(e.target.value)} />
        <br /><br />
        <label htmlFor="password">Password :</label>
        <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
        <br /><br />

        <input type="submit" value="Login" />
      </form>
      {institution}
    </> 
  )
}

export default organizationLogin