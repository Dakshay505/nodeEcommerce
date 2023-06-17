import User from "../model/userModel.js"
import  jwt  from "jsonwebtoken";
export const isAuthenticated = async (req,resp,next)=>{
    const {token } = req.cookies;
   
    if(!token){
     return resp.status(404).json({
         success:false,
         message:"Login first."
     })
    }
    const decodedData = jwt.verify(token,process.env.JWT_KEY);
    // const decodedData = jwt.verify(token,process.env.JWT_KEY);
   
    const user = await User.findById(decodedData.user.id);
   
    req.user = user;
    next();
}