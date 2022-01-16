const Product=require("../model/productmodel");
const errorhandler=require("../utils/errorhandler");
const cathasyncerror=require("../middleware/catchasyncerror");
const Apifeatures=require("../utils/apifeatures");
const cloudinary =require('cloudinary').v2
exports.createProduct= cathasyncerror(async(req,res,next)=>{
 
    
      let image = [];

      if (typeof req.body.image === "string") {
        image.push(req.body.image);
      } else {
        image = req.body.image;
      }
    
      const imagesLinks = [];
    
      for (let i = 0; i < image.length; i++) {
        const result = await cloudinary.uploader.upload(image[i], {
          folder: "products",
        });
    
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    
      req.body.image = imagesLinks;
      req.body.user=req.user.id;
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});
// Get All Product (Admin)
exports.getAdminProducts = cathasyncerror(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });
exports.getAllProduct=cathasyncerror( async(req,res,next)=>{
 
    const resultPerPage=8;
    const productCount=await Product.countDocuments();
    //return next(new errorhandler("this is my error ",500));
       const apifeatures=new Apifeatures(Product.find(),req.query)
       
       .search()
       .filter()
       .pagination(resultPerPage)

    const products=await apifeatures.query

    res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage

    })
});

exports.getProductDetails=cathasyncerror(async(req,res,next)=>{
    
    const product=await Product.findById(req.params.id);
   
  if(!product)
  {
      return next(new errorhandler("product is not found",500))
  }
    res.status(200).json({
        success:true,
        product
    })
});
exports.updateProduct=cathasyncerror(async(req,res,next)=>{
    
    let product=await Product.findById(req.params.id);
  if(!product)
  {
      return next(new errorhandler("product is not found",501))
  }

  // Images Start Here
  let image = [];

  if (typeof req.body.image === "string") {
    image.push(req.body.image);
  } else {
    image = req.body.image;
  }

  if (image !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.image.length; i++) {
      await cloudinary.uploader.destroy(product.image[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < image.length; i++) {
      const result = await cloudinary.uploader.upload(image[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.image = imagesLinks;
  }
  product=await Product.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({
        success:true,
        product
    })
})
exports.deleteProduct=cathasyncerror(async(req,res,next)=>{
    
    let product=await Product.findById(req.params.id);
  if(!product)
  {
       return next(new errorhandler("product is not found",500))
  }
  await product.remove();
    res.status(200).json({
        success:true,
        message:"product is deleted successfully"
    })
});
exports.createProductReviews=cathasyncerror(async(req,res,next)=>{
const {rating,Comment,productId} =req.body;
    const review={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    Comment,
};
const product=await Product.findById(productId);

const isReviewed =product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString());
if(isReviewed)
{
    product.reviews.forEach((rev)=>{
        if(rev.user.toString()===req.user._id.toString())
        (rev.rating=rating),(rev.Comment=Comment);
    });
    
}
else
{
product.reviews.push(review);
product.numOfReviews=product.reviews.length;
}
let avg=0;
product.reviews.forEach((rev)=>{
    avg+=rev.rating;
})
product.ratings=avg/product.reviews.length;
await product.save({validateBefore: false});
res.status(200).json({
    success:true
});
})

exports.getProductReviews=cathasyncerror(async(req,res,next)=>{
  
const product=await Product.findById(req.query.id);

if(!product)
{
    return next(new errorhandler("product is not found",500))
}
res.status(200).json({
    success:true,
    reviews: product.reviews
})
})
exports.deleteProductReviews=cathasyncerror(async(req,res,next)=>{
  
    const product=await Product.findById(req.query.productId);
    if(!product)
    {
        return next(new errorhandler("product is not found",500))
    }
    const reviews=product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString());
    let avg=0;
reviews.forEach((rev)=>{
    avg+=rev.rating;
});
let ratings=0;
if(reviews.length==0)
{
    ratings=0;
}
else
{
    ratings=avg/reviews.length;
}
const numOfReviews=reviews.length;
await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews,
})
await product.save({validateBefore: false});

    res.status(200).json({
        success:true,
        message: 'Reviews deleted successfully'
    })
    })