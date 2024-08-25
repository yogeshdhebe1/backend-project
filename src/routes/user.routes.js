import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDeatils,
  updateUserAvatar,
  updateUserCoverImg,
} from "../controllers/user.controller.js";
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

router.route("/login").post(loginUser);

//secured routes

router.route("/logout").post(veriftyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(veriftyJWT, changeCurrentPassword);
router.route("/current-user").get(veriftyJWT, getCurrentUser);
router.route("/update-account").patch(veriftyJWT, updateAccountDeatils);
router
  .route("/avatar")
  .patch(veriftyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/cover-img")
  .patch(veriftyJWT, upload.single("coverImage"), updateUserCoverImg);
router.route("/c/:username").get(veriftyJWT, getUserChannelProfile);
router.route("/history").get(veriftyJWT, getWatchHistory);
export default router;
