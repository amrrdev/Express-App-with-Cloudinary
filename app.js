import gloablErrorHandlerMiddleware from "./middlewares/gloablErrorHandler.js";
import AppError from "./utils/appError.js";
import express from "express";

const app = express();

app.all("*", (req, res, next) => {
    return next(new AppError(`Can't fint ${req.url} on this server`, 404));
});

app.use(gloablErrorHandlerMiddleware);
export default app;
