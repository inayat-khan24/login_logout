import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Login'
import Register from './page/Register'
import Refreshhandler from './Refreshhandler'

const App = () => {
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }
  return (
   <BrowserRouter>
   <Refreshhandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path='/'  element={<PrivateRoute element={<Home/>}/>}/>
      <Route path='/login'  element={<Login/>}/>
      <Route path='/register'  element={<Register/>}/>
      
    </Routes>
   </BrowserRouter>
  )
}

export default App
