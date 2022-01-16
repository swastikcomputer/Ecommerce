const User=require("../model/userModel");
const catchAsyncError = require("../middleware/catchasyncerror");
const ErrorHandler = require("../utils/errorhandler");
const sendToken=require("../utils/JWTToken");
const cloudinary =require('cloudinary').v2
const sendEmail=require("../utils/sendfile");
const crypto = require('crypto');
exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const data = {
        image: req.body.avatar
      }
    
     const myCloud=await cloudinary.uploader.upload(data.image,{
         folder:"avatars",
         width:150,
         crop:"scale",
      }) 
      
const {name,email,password} = req.body;
const user=await User.create({name,email,password,
avatar:{
    public_id: myCloud.public_id,
    url: myCloud.secure_url
}
});
sendToken(user,201,res);
});
exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }
    const user=await User.findOne({email}).select("+password")
    if(!user)
    {
        return next(new ErrorHandler("Invalid Email & Password",401));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Invalid Email & Password",401));
    }
    sendToken(user,201,res);
})
exports.logout=catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message:"logout"
    })
})
exports.forgetPassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    
    if(!user)
    {
        return next(new ErrorHandler("user not found",404));
    }
    const resetToken=user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`
    // const resetPasswordUrl=`http://localhost:3000/password/reset/${resetToken}`
    const message=`Your password reset Token is:\n\n ${resetPasswordUrl}\n\n  if you have not requested this email then, please ignore it.`;
    try
    {
        
await sendEmail({
    email:user.email,
    subject:`MERN Password Recovery`,
    message
});
res.status(200).json({
    success:true,
    message:`Email send ${user.email} successfully`,
})

    }
    catch(Error)
    {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(Error.message,500));
    }
})

exports.resetPassword=catchAsyncError(async(req,res,next)=>{
    
    const resetPasswordToken=crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex");
   const user=await User.findOne({
       resetPasswordToken,
       resetPasswordExpire:{$gt:Date.now()},
   })
   if(!user)
   {
    return next(new ErrorHandler("Reset Password token is has been expired",400));
   }
   if(req.body.password!==req.body.confirmPassword)
   {
    return next(new ErrorHandler("password does not match",400));
   }
   user.password=req.body.password;
   user.resetPasswordToken=undefined;
   user.resetPasswordExpire=undefined;
   await user.save();
   sendToken(user,201,res);
})
exports.getUserDetails= catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        successs: true,
        user,
    })
})
exports.updatePassword= catchAsyncError(async(req,res,next)=>{
    
    const user = await User.findById(req.user.id).select("+password")
    
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Old Password is incorrect",401));
    }
    if(req.body.newPassword!==req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password does not match",401));
    }
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,201,res);
});
exports.updateProfile=catchAsyncError(async(req,res,next)=>{
     
    const newUserData={
        name:req.body.name,
        email:req.body.email
    };

    const data = {
        image: req.body.avatar
      }
      
    if (data.image !== "undefined") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.uploader.destroy(imageId);
    
        
        
         const myCloud=await cloudinary.uploader.upload(data.image,{
             folder:"avatars",
             width:150,
             crop:"scale",
          })
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
const user = await User.findByIdAndUpdate(req.user.id,newUserData);
res.status(200).json({
    successs: true,
    
})
})
exports.getAllUser= catchAsyncError(async(req,res,next)=>{
    const user= await User.find();
    res.status(200).json({
        successs: true,
        user
        
    })
})
exports.getSingleUser= catchAsyncError(async(req,res,next)=>{
    const user= await User.findById(req.params.id);
    if(!user)
    {
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`,401));
    }
    res.status(200).json({
        successs: true,
        user
        
    })
})
exports.updateUserRole= catchAsyncError(async(req,res,next)=>{
 
    const newUserData={
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    };
    
    const user= await User.findByIdAndUpdate(req.params.id,newUserData);
    
    res.status(200).json({
        successs: true,
       user,
    })
})
exports.deleteUser= catchAsyncError(async(req,res,next)=>{
    const user= await User.findById(req.params.id);
    if(!user)
    {
        return next(new ErrorHandler(`User does not exist with id:${req.params.id}`,400));
    }
    await user.remove();
    res.status(200).json({
    successs:true,
    message:"User deleted successfully",
})
})