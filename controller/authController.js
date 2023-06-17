import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import {sendCookie} from "../services/feature.js"
import ErrorHandler from "../middleware/error.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

// adding user
export const addUser = catchAsyncError(async (req, resp,next) => {
    const { name, email, password } = req.body;
   
  let user = await User.findOne({ email });
  console.log("addii",user,email);
  if (user) return next(new ErrorHandler("User already exist", 400));

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });

  sendCookie(resp, user, "User created successfully.", 201);
});
// login user
export const loginUser =catchAsyncError( async (req, resp,next) => {
  const { email, password } = req.body;
 
  const user   = await User.findOne({email});
  if (!user) return next(new ErrorHandler("User doesn't exist.", 404));

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword)
    return next(new ErrorHandler("User or Password doesn't match.", 400));

  sendCookie(resp, user, `Welcome back , ${user.name}`, 200);
})
