import { promisify } from "node:util";

import catchAsync from "./catchAsync.js";

import jwt from "jsonwebtoken";

export const verifyJwtToken = catchAsync(async (token) => {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    return decoded;
});

export const generateToken = catchAsync(async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
});
