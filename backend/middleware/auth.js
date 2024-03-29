const User=require("../model/userModel");
const catchAsyncError = require("../middleware/catchasyncerror");
const ErrorHandler = require("../utils/errorhandler");
const JWT= require("jsonwebtoken");
exports.isAutheticatedUser=catchAsyncError(async(req,res,next)=>{

  
    const {token}=req.cookies;
    if(!token)
    {
        return next(new ErrorHandler("Please Login to access this resource.",401));

    }
    const decodedData=JWT.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decodedData.id);
    next();
});
exports.authorizeRole=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`,401));
        }
        next();
    }
}