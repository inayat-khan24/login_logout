import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { handleError, handleSuccess } from '../utils.jsx'

const Register = () => {
const [user,SetUser] = useState({
    name:"",
    email:"",
    password:"",

})

const handleInput =(e)=>{
  const data = e.target
  SetUser({...user,[data.name]:data.value})
}
const navigate = useNavigate()

    const handleSubmit=async(e)=>{
      e.preventDefault()
  const {name,email,password} = user
  if(!name || !email || !password){
     return handleError('name,email,password are required')
  }


       try {
         e.preventDefault()
            const res = await axios.post("http://localhost:5001/register",user)
            console.log(res)
          const {success,message,error} = res.data
            if(success){
                handleSuccess(message)
                setTimeout(()=>{
                  navigate("/login")
                },1000)}
                 else if(!success) {
                  handleError(message)
                }

       } catch (error) {
         console.log(error.response?.data); // Debug only
  const msg = error.response?.data?.error?.details?.[0]?.message 
              
  handleError(msg);
       }

        
    }
  return (
    <div className='bg-gray-400 min-h-screen flex justify-center items-center'>
        <div className='bg-[skyblue] flex flex-col p-4 min-w-[30%] rounded-md'>
            <h1 className='text-center text-xl font-bold '>Singup</h1>
            <form action="" className='flex flex-col gap-2' onSubmit={handleSubmit}>
                <label htmlFor="name" className='text-xl  text-gray-800'>Name</label>
                <input type="text" 
                name='name'
                
                autoFocus
                onChange={handleInput}
                value={user.name}
                className='bg-white focus:outline-none py-2  rounded-[4px] placeholder:p-2'
                placeholder='Enter Name'
                 />
                 <label htmlFor="email" className='text-xl  text-gray-800'>Email</label>
                <input type="email" 
                name='email'
                onChange={handleInput}
                value={user.email}
               
                className='bg-white focus:outline-none py-2  rounded-[4px] placeholder:p-2'
                placeholder='Enter Email'
                 />
                 <label htmlFor="password" className='text-xl  text-gray-800'>Password</label>
                <input type="password" 
                onChange={handleInput}
                value={user.password}
                name='password'
                className='bg-white focus:outline-none py-2  rounded-[4px] placeholder:p-2'
                placeholder='Enter Password'
                 />
                 <button
                  type='submit'
                  className='bg-[gray] p-2 rounded-sm mt-2'
                  >Singup</button>
 
            </form>
        <div className='flex mt-3 gap-2'>
          <p>Already have an account ?</p> 
           <Link to={"/login"}  className='text-blue-900 underline'>Login</Link></div>
   <ToastContainer/>
        </div>

    </div>
  )
}

export default Register
