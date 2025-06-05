import { formModel } from "../mongoose/model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export  const createForm = async(req,res)=>{
  try {
      const {name,email,password} = req.body
      const user = await  formModel.findOne({email})
      if(user){
      return  res.status(409).json({massage:"user already exist,uou can login",success:false})
      }
    
      const passwordHashed = await bcrypt.hash(password,10)
     const formcreate = new formModel({name,email,password:passwordHashed} )
     const saveForm = await formcreate.save()
    return  res.status(201).json({saveForm,message:"sing up",success:true})
   } catch (err) {
    console.log(err)
        return res.status(500).json({massage:"internal server error ",success:false})
   }
} 

export  const login = async(req,res)=>{
   try {
      const {email,password} = req.body
      const user = await  formModel.findOne({email})
      
      if(!user){
      return  res.status(403).json({massage:"email is wrong",success:false})
      }
      //* for checking password is correct or not
     const isPasswordEqual = await bcrypt.compare(password,user.password)
     if(!isPasswordEqual){
    return res.status(403).json({massage:"password is wrong"})
     }
   //* if email and password is correact then we will sne jwt token
   const jwtToken = jwt.sign(
    {email:user.email,_id:user._id,},
    process.env.JWT_SECRET,
    {expiresIn:"24h"} )
    // after that make product api

   res.status(200).json({
    message: "login success",
    success:true,
    jwtToken,
    email,
    name : user.name,
    
   })
      
   } catch (err) {
    return res.status(500).json({massage:"internal server error ",error:err.massage})
   }
}


// for get all valu 
export const getform = async(req,res)=>{
  try {
    const value = await formModel.find()
    
      res.status(200).json(value)
 
  } catch (error) {
    res.status(500).json({massage:"internal server error ",error:error.massage})
  }
}
