import gloablErrorHandlerMiddleware from "./middlewares/gloablErrorHandler.js";
import productRouter from "./routes/productRoutes.js";
import AppError from "./utils/appError.js";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

const app = express();

app.use(morgan("dev"));
app.use(express.static("./public"));
app.use(express.json());

// parse multipart/form data
app.use(fileUpload({ useTempFiles: true }));

console.log(process.env.CLOUDINARY_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res, next) => {
    res.send("<h1>Hello motherfucker</h1>");
});

app.use("/api/v1/products", productRouter);

app.all("*", (req, res, next) => {
    return next(new AppError(`Can't fint ${req.url} on this server`, 404));
});

app.use(gloablErrorHandlerMiddleware);
export default app;
