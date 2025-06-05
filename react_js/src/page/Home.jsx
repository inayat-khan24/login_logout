import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSuccess } from '../utils.jsx'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  const [data,setData] = useState([])
  const [loggedInUser,setLoggedInUser] = useState("")
  const navigate = useNavigate()
  const dataFetch = async()=>{
   try {
    const token = localStorage.getItem('token');
     const res = await axios.get("http://localhost:5001/products",{
      headers:{
        Authorization:`${token}`
      }
     })
    
   console.log(res)
    setData(res.data)
    
   } catch (error) {
    console.log(error)
   }
  }
   


 
  useEffect(()=>{
   setLoggedInUser( localStorage.getItem('loggedInuser'))
    dataFetch()
  },[])

const handleLogout =()=>{
   localStorage.removeItem('token')
   localStorage.removeItem('loggedInuser')
   handleSuccess("user logged out")
   setTimeout(() => {
     navigate("/login")
   }, 1000);
}
  
  return (
    <div className='min-h-screen flex flex-col gap-4 justify-center items-center'>
      <h1>{`welcome ${loggedInUser}`}</h1>
    <div className='flex  gap-8'>
      {
        data.map((e,index)=>{
          return <div key={index} >  
         
             <h1>{e.name}</h1>
           <h1>{e.price}</h1>
          
          </div>
        })
      }
      <ToastContainer/>
    </div>
      <button 
      onClick={handleLogout}
      className='bg-sky-500 p-2 rounded-[4px] border-none hover:bg-sky-400'>Logout</button>
    </div>
  )
}

export default Home
