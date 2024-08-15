import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const veriftyJWT = asyncHandler(async (req, _, next) => {
  //if res is not in use you can replace with _ nomrally in production
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password",
      "-refreshToken",
    );
    if (!user) {
      //NEXT_VIDEO: discuss about frontend
      throw new ApiError(401, "Invalid access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid access Token");
  }
});
