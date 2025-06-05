 import express from "express"
import { createForm, getform, login } from "../controller/formController.js"
import {  singupValidation } from "../middleware/AuthValidation.js"

 export  const route = express.Router()

  // login form
 route.post("/login",login)
 
 // register form
 route.post("/register",singupValidation,createForm)
 // get data mongodb to user
 route.get("/form",getform)



 


