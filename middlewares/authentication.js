import { verifyJwtToken } from "../utils/jwtUtils.js";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const isAuthenticated = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
        return next(new AppError("Your are not logged in! Please log in to get accesss", 401));

    const decoded = await verifyJwtToken(token);
    console.log(decoded);
});
