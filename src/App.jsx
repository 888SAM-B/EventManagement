import { useEffect, useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './page/home'
import Login from './page/login'
import Register from './page/register'
import Dashboard from './page/dashboard'
function App() {
  return (
    <>
     <div>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/register' element={<Register/>} ></Route>
        <Route path='/dashboard' element={<Dashboard/>} ></Route>
      </Routes>
     </div>
    </>
  )
}

export default App
