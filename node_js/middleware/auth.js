import jwt from "jsonwebtoken";
export const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization'];
  
    if(!auth){
        return res.status(401).
        json({message:'unauthorized,JWT token is require'})
    }
    try {
         const decoded = jwt.verify(auth,process.env.JWT_SECRET)
         req.user = decoded;
        
         
         next();
    } catch (error) {
        console.log(error)
       return res.status(401).
        json({message:'unauthorized,JWT token wrong or expire'})   
    }
}