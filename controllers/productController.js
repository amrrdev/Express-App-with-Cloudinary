import catchAsync from "./../utils/catchAsync.js";
import Product from "../models/Product.js";
import StatusCodes from "http-status-codes";

export const createProduct = catchAsync(async (req, res, next) => {
    const product = await Product.create({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
    });
    res.status(StatusCodes.OK).json({ product });
});

export const getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products });
});
