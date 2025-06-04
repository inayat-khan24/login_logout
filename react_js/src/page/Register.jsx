import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
       try {
         e.preventDefault()
            const res = await axios.post("http://localhost:5001/register",user)
            
            if(res.status === 201){
                
                navigate("/login")

            }
       } catch (error) {
        console.log(error)
        
                alert(error.response?.data?.message || "Registration failed")
       }

        
    }
  return (
    <div className='bg-gray-400 min-h-screen flex justify-center items-center'>
        <div className='bg-[skyblue] flex flex-col p-4 min-w-[30%] rounded-md'>
            <h1 className='text-center text-xl font-bold '>Register</h1>
            <form action="" className='flex flex-col gap-2' onSubmit={handleSubmit}>
                <label htmlFor="name" className='text-xl  text-gray-800'>Name</label>
                <input type="text" 
                name='name'
                required
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
                  >Sing UP</button>
 
            </form>

        </div>

    </div>
  )
}

export default Register
