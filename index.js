import express from "express";
import {config} from "dotenv";
import connectDb from "./database/dbConnect.js";
import productRouter from "./routes/productRoutes.js";
import brandRouter from "./routes/brandRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import cors from "cors"

config({path:"./config.env"});

const app = express();

//connectdatabase
connectDb();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/products",productRouter);
app.use("/api/brand" ,brandRouter);
app.use("/api/category" ,categoryRouter);


const port = process.env.PORT;

app.listen(port,(req,resp)=>{
    console.log(`http://localhost:${port}`)
})