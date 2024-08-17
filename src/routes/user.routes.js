import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { veriftyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImg",
      maxCount: 1,
    },
  ]),

  registerUser,
);

router.route("/login").post(loginUser)

//secured routes

router.route("/logout").post(veriftyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;
