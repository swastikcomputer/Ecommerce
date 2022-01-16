import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./Payment.css";
import { createOrder, clearErrors } from "../../action/OrderAction";
const EventIcon =<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>
const VpnKeyIcon =<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 19h-6v-4h-2.68c-1.14 2.42-3.6 4-6.32 4-3.86 0-7-3.14-7-7s3.14-7 7-7c2.72 0 5.17 1.58 6.32 4H24v6h-2v4zm-4-2h2v-4h2v-2H11.94l-.23-.67C11.01 8.34 9.11 7 7 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c2.11 0 4.01-1.34 4.71-3.33l.23-.67H18v4zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg>
const CreditCardIcon= <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>


const Payment = () => {
    const navigate=useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
  
    const { shippingInfo, cartsItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
     const { error } = useSelector((state) => state.newOrder);
  
    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100),
    };
  
     const order = {
      shippingInfo,
      orderItems: cartsItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
   shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
     };
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      payBtn.current.disabled = true;
  
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/payment/process",
          paymentData,
          config
        );
  
        const client_secret = data.client_secret;
  
        if (!stripe || !elements) return;
  
        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
              },
            },
          },
        });
  
        if (result.error) {
          payBtn.current.disabled = false;
  
          alert.error(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            order.PaymentInfo = {
            id: result.paymentIntent.id,
             status: result.paymentIntent.status,
            };
  console.log(order)
            dispatch(createOrder(order));
  
            navigate("/success");
          } else {
            alert.error("There's some issue while processing payment ");
          }
        }
      } catch (error) {
        payBtn.current.disabled = false;
        alert.error(error.response.data.message);
      }
    };
  
     useEffect(() => {
     if (error) {
        alert.error(error);
       dispatch(clearErrors());
       }
     }, [dispatch, error, alert]);
  
    return (
        <Fragment>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <Typography>Card Info</Typography>
            <div>
            {CreditCardIcon} 
              <CardNumberElement className="paymentInput" />
            </div>
            <div>
              {EventIcon} 
              <CardExpiryElement className="paymentInput" />
            </div>
            <div>
              {VpnKeyIcon} 
              <CardCvcElement className="paymentInput" />
            </div>
  
            <input
              type="submit"
              value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className="paymentFormBtn"
            />
          </form>
        </div>
      </Fragment>
    )
}

export default Payment
