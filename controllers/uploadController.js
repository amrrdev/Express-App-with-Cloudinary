import path from "node:path";

import catchAsync from "./../utils/catchAsync.js";
import Product from "../models/Product.js";
import StatusCodes from "http-status-codes";

export const uploadProductImage = catchAsync(async (req, res, next) => {
    const productImage = req.files.image;
    const imagePath = path.join(import.meta.dirname, "../public/uploads/" + `${productImage.name}`);
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
});
