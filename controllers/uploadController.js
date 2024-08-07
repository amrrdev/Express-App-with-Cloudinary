import fs from "node:fs";
import path from "node:path";

import catchAsync from "./../utils/catchAsync.js";
import Product from "../models/Product.js";
import StatusCodes from "http-status-codes";
import AppError from "../utils/appError.js";

import { v2 as cloudinary } from "cloudinary";

// upload images and store it locally
export const uploadProductImageLocal = catchAsync(async (req, res, next) => {
    if (!req.files) return next(new AppError("No Image Uploaded!", StatusCodes.BAD_REQUEST));

    const productImage = req.files.image;

    if (!productImage.mimetype.startsWith("image"))
        return next(new AppError("Please Upload Image!", StatusCodes.BAD_REQUEST));

    const MAX_SIZE = 1024 * 1024;

    if (productImage.size > MAX_SIZE)
        return next(new AppError("Please upload image smaller 1MB", StatusCodes.BAD_REQUEST));

    const imagePath = path.join(
        import.meta.dirname,
        "../public/uploads/" + `${productImage.names}`
    );
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
});

export const uploadProductImage = catchAsync(async (req, res, next) => {
    // Check if any files were uploaded
    if (!req.files || !req.files.image) {
        return next(new AppError("No Image Uploaded!", StatusCodes.BAD_REQUEST));
    }

    const imageFile = req.files.image;

    // Log file details for debugging
    console.log("File uploaded:", imageFile);

    // Validate file type (ensure it's an image)
    const validTypes = ["image/jpeg", "image/png", "image/gif"];

    if (!validTypes.includes(imageFile.mimetype)) {
        return next(
            new AppError("Invalid file type. Only images are allowed.", StatusCodes.BAD_REQUEST)
        );
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        use_filename: true,
        folder: "file-upload",
    });

    // Delete the temporary file
    fs.unlink(imageFile.tempFilePath, (err) => {
        if (err) {
            console.error("Error deleting temporary file:", err);
        } else {
            console.log("Temporary file deleted.");
        }
    });

    return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
});
