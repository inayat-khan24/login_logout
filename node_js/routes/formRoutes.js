 import express from "express"
import { createForm, getform, login } from "../controller/formController.js"

 export  const route = express.Router()

  // login form
 route.post("/login",login)
 
 // register form
 route.post("/register",createForm)
 // get data mongodb to user
 route.get("/form",getform)



 


