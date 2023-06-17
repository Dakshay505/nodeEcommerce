import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDb from "./database/dbConnect.js";
import passport from "passport";
import Stripe from "stripe";
// import LocalStrategy from "passport-local";
// import JWTStrategy from "passport-jwt";
import cookieParser from "cookie-parser";
import session from "express-session";
// import bcrypt from "bcrypt";
// import {cookieExtractor,isAuth ,sanitizeUser} from "./services/common.js"

import User from "./model/userModel.js";

const stripe = Stripe(process.env.SK_TEST);
// const opts = {};
// opts.jwtFromRequest = cookieExtractor;
// opts.secretOrKey = process.env.JWT_KEY;

//router
import productRouter from "./routes/productRoutes.js";
import brandRouter from "./routes/brandRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { errorMiddleware } from "./middleware/error.js";
import { isAuthenticated } from "./middleware/auth.js";

config({ path: "./config.env" });

const app = express();

//connectdatabase
connectDb();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
    origin: process.env.FRONTEND_URI,
  })
);
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false, // don't save session if unmodified
//     saveUninitialized: false, // don't create session until something stored
//   })
// );

// // app.use(passport.authenticate("session"));

// // // using passport local
// // passport.use(
// //   "local",
// //   new LocalStrategy({ usernameField: "email" }, async function (email,password,done) {
// //     try {
// //       console.log("local");
// //       const user = await User.findOne({ email: email });
// //       if (!user) {
// //         done(null, false, { message: "User or password does not match." });
// //       }
// //       console.log(password,email)
// //       if (!bcrypt.compare(password, user.password)) {
// //         done(null, user, { message: "User or password does not match." });
// //       }else{
// //       const token = jwt.sign(sanitizeUser(user), process.env.JWT_SECRET_KEY);
// //       console.log(token)
// //       done(null, { id: user.id, role: user.role, token });}
// //     } catch (error) {
// //       done(error);
// //     }
// //   })
// // );

// // // using passport-jwt
// // passport.use("jwt",new JWTStrategy(opts,async function (jwtPayload, done) {
// //       //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.

// //         try {
// //             const user = await User.findOneById(jwtPayload.id)
// //         if(user){
// //             return done(null,sanitizeUser(user))
// //         }else{
// //             return done(null,false)
// //         }
// //         } catch (error) {
// //             return done(error,false)
// //         }
// //     }
// //   )
// // );

// // this create session variable req.user on being called from callback
// passport.serializeUser(function (user, cb) {
//   console.log("serial", user);
//   process.nextTick(() => {
//     return cb(null, { id: user.id, role: user.role });
//   });
// });
// // this change session variable req.user on being called from authorized req
// passport.deserializeUser(function (user, cb) {
//   console.log("des", user);
//   process.nextTick(() => {
//     return cb(null, user);
//   });
// });

// routes
app.use("/products", productRouter);
app.use("/brands", brandRouter);
app.use("/categories", categoryRouter);
app.use("/users", isAuthenticated, userRouter);
app.use("/auth", authRouter);
app.use("/cart", isAuthenticated, cartRouter);
app.use("/orders", isAuthenticated, orderRouter);

// stripe
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// handling the error
app.use(errorMiddleware);

const port = process.env.PORT;

app.listen(port, (req, resp) => {
  console.log(`http://localhost:${port}`);
});
