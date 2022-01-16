const express=require('express');
const { registerUser, loginUser, logout, forgetPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getSingleUser, updateUserRole, deleteUser, getAllUser } = require('../controller/usercontroller');
const { isAutheticatedUser, authorizeRole } = require('../middleware/auth');
const router=express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/userdetails").get(isAutheticatedUser,getUserDetails);
router.route("/password/update").put(isAutheticatedUser,updatePassword);
router.route("/userdetails/updateProfile").put(isAutheticatedUser,updateProfile);
router.route("/admin/alluser").get(isAutheticatedUser,authorizeRole("admin"),getAllUser);
router.route("/admin/user/:id").get(isAutheticatedUser,authorizeRole("admin"),getSingleUser)
.put(isAutheticatedUser,authorizeRole("admin"),updateUserRole)
.delete(isAutheticatedUser,authorizeRole("admin"),deleteUser);
module.exports=router;