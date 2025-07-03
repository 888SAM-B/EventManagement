import { useEffect, useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './page/home'
import Login from './page/login'
import Register from './page/register'
import Dashboard from './page/dashboard'
import AddContent from './page/addContent'
import FileUpload from './page/FileUpload'
import Event from './page/event'
function App() {
  return (
    <>
     <div>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/register' element={<Register/>} ></Route>
        <Route path='/dashboard' element={<Dashboard/>} ></Route>
        <Route path='/add-content' element={<AddContent/>} ></Route>
        <Route path='/file-upload' element={<FileUpload/>} ></Route>
        <Route path='/event' element={<Event/>} ></Route>
        <Route path='*' element={<h1>404 Not Found</h1>} ></Route>
      </Routes>
     </div>
    </>
  )
}

export default App
