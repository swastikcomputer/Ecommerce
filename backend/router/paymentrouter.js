const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controller/paymentcontroller");
const router = express.Router();
const { isAutheticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAutheticatedUser, processPayment);

router.route("/stripeapikey").get(isAutheticatedUser, sendStripeApiKey);

module.exports = router;
