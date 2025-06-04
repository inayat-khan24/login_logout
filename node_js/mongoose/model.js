import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


try {
      await mongoose.connect(process.env.MONGO_URL)
      mongoose.set("debug",true)
} catch (error) {
    console.error("❌ MongoDB connection failed:", error.message)
}

const FormSchema = mongoose.Schema({
 name : {type: String , required: true},
 email : {type: String , required: true,unique:true},
 password : {type: String,required:true}
}, {
    timestamps: true, 
  })

export const formModel = mongoose.model("user",FormSchema)