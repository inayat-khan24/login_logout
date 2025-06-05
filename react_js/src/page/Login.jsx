import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils.jsx'


const Login = () => {
const [user,SetUser] = useState({
   
    email:"",
    password:"",

})

const navigate = useNavigate()

const handleInput =(e)=>{
  const data = e.target
  SetUser({...user,[data.name]:data.value})
}


    const handleSubmit=async(e)=>{
      e.preventDefault()
  const {email,password} = user
  if(!email || !password){
     return handleError('email,password are required')
  }


       try {
         e.preventDefault()
            const res = await axios.post("http://localhost:5001/login",user)
           
          const {success,message,jwtToken,name,error} = res.data
            if(success){
                handleSuccess(message)
                localStorage.setItem('token',jwtToken)
                localStorage.setItem("loggedInuser",name)
                setTimeout(()=>{
                  navigate("/")
                },1000)}
                 else if(!success) {
                  handleError(message)
                }

       } catch (error) {
     
   const msg = error?.response?.data?.massage
   
  handleError(msg)
       }

        
    }
  return (
    <div className='bg-gray-400 min-h-screen flex justify-center items-center'>
        <div className='bg-[skyblue] flex flex-col p-4 min-w-[30%] rounded-md'>
            <h1 className='text-center text-xl font-bold '>Login</h1>
            <form action="" className='flex flex-col gap-2' onSubmit={handleSubmit}>
                
                 <label htmlFor="email" className='text-xl  text-gray-800'>Email</label>
                <input type="email" 
                name='email'
                onChange={handleInput}
                value={user.email}
                required
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
                  >Login</button>
 
            </form>
            
            <div className='flex mt-3 gap-2'>
                      <p> Don't have an accont ?</p> 
                       <Link to={"/register"}  className='text-blue-900 underline'>Singup</Link></div>
               <ToastContainer/>
                   
        </div>
    </div>
  )
}

export default Login
