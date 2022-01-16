const express=require('express');
const { createProduct, getAllProduct, getProductDetails, updateProduct, deleteProduct, createProductReviews, getProductReviews, deleteProductReviews,getAdminProducts } = require('../controller/productcontroller');
const { isAutheticatedUser, authorizeRole } = require('../middleware/auth');
const router=express.Router();

router.route("/product/new").post(isAutheticatedUser,authorizeRole("admin"),createProduct);
router.route("/products").get(getAllProduct);
router
  .route("/admin/products")
  .get(isAutheticatedUser, authorizeRole("admin"), getAdminProducts);

router.route("/products/:id").get(getProductDetails)
.put(isAutheticatedUser,authorizeRole("admin"),updateProduct)
.delete(isAutheticatedUser,authorizeRole("admin"),deleteProduct);
router.route("/review").put(isAutheticatedUser,createProductReviews);
router.route("/review").get(getProductReviews);
router.route("/reviews").put(isAutheticatedUser,deleteProductReviews);
module.exports=router;