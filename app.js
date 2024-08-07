import path from "node:path";

import gloablErrorHandlerMiddleware from "./middlewares/gloablErrorHandler.js";
import productRouter from "./routes/productRoutes.js";
import AppError from "./utils/appError.js";

import express from "express";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.static("./public"));
// parse json
app.use(express.json());

// parse multipart/form data
app.use(fileUpload({ createParentPath: true }));

app.get("/", (req, res, next) => {
    res.send("<h1>Hello motherfucker</h1>");
});

app.use("/api/v1/products", productRouter);

app.all("*", (req, res, next) => {
    return next(new AppError(`Can't fint ${req.url} on this server`, 404));
});

app.use(gloablErrorHandlerMiddleware);
export default app;
