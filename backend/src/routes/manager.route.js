import { Router } from "express";
import {
  fetchForm,
  viewEnqueryData,
  totalEnqueryData,
  totalSellerData,
  fetchSellerForm,
  loginManager,
  logoutmanager,
  forgotPassword,
  resetPassword,
  editDetails,
  changePassword,
  changeManagerEmail,
  managerResendOtp,
  verifyEmails,
  managerdetailsSend,
  managerPosts,
  deletePosts,
  editPostbyManager,
  viewSeller,
  fetchAllForms,
  fetchBuyerData,
  stateCheckingSeller,
  stateCheckingEnquery,
  stateCheckingBuyer,
  managerStats,
  myPostData,
  myPostDetailsData
} from "../controller/manager.services.controller.js";
import { verifyJWT } from "../middlewares/general/auth.middleware.js";
import { Manager } from "../models/manager.model.js";
import { middlewares } from "../middlewares/index.js";
const{upload} = middlewares;

const router = Router();

router.route("/login").post(loginManager);
router.route("/logout").post(verifyJWT(Manager), logoutmanager);
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").patch(resetPassword)

//edit manager
router.route("/managerdetails").get(verifyJWT(Manager), managerdetailsSend);
router.route("/edit/:role/:userId").patch(verifyJWT(Manager),editDetails)
router.route("/changeemail").patch(verifyJWT(Manager),changeManagerEmail)
router.route("/verifymail").post(verifyJWT(Manager),verifyEmails);
router.route("/changepassword/:role/:userId").patch(verifyJWT(Manager),changePassword);
router.route("/resend-otp").post(verifyJWT(Manager),managerResendOtp)

// enquery from
router.route("/enqueryfrom").get(verifyJWT(Manager), fetchForm);
router.route("/enquery/:formId/data").get(verifyJWT(Manager),viewEnqueryData)
router.route("/enquerystate/:enqueryId").patch(verifyJWT(Manager),stateCheckingEnquery)
router.route("/totalenquery").get(verifyJWT(Manager),totalEnqueryData)

//seller datate change
router.route("/fetchallseller").get(verifyJWT(Manager), fetchSellerForm);
router.route("/seller/:sellerId/data").get(verifyJWT(Manager), viewSeller);
router.route("/sellerstate/:sellerId").patch(verifyJWT(Manager),stateCheckingSeller)
router.route("/totalseller").get(verifyJWT(Manager),totalSellerData);

//manager  post
router.route("/post/:sellerId?").post(
  verifyJWT(Manager),
  upload.fields([
     {
      name: "avatar",
      maxCount: 1,
    },
    {
        name: "images",
        maxCount:8,
    }
  ]),
  managerPosts);
router.route("/editpost/:postId").patch(verifyJWT(Manager),editPostbyManager);
router.route("/deletepost/:postId").delete(verifyJWT(Manager),deletePosts)

//buy property
router.route("/fetchallforms").get(verifyJWT(Manager), fetchAllForms);
router.route("/fetchdata/:postId").get(verifyJWT(Manager),fetchBuyerData);
router.route("/buyserstate/:buyerId").patch(verifyJWT(Manager),stateCheckingBuyer);


//getting the data for stats
router.route("/manager-data/:managerId").get(verifyJWT(Manager),managerStats)

//my all posts
router.route("/post/:managerId").get(verifyJWT(Manager),myPostData)

//post details
router.route("/post-details/:postId").get(verifyJWT(Manager),myPostDetailsData)


export default router;
