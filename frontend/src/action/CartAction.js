import {ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO} from '../constants/CartConstant'
import axios from 'axios'
// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
   
    dispatch({
      type: ADD_TO_CART,
      
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.image[0].url,
        stock: data.product.stock,
        quantity,
       },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartsItems));
    

  };
  // REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  console.log(id)
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartsItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
 
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
