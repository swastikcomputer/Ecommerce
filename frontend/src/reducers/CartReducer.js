
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO
} from "../constants/CartConstant";
const initalState={
  cartsItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
  shippingInfo: localStorage.getItem("shippingInfo")? JSON.parse(localStorage.getItem("shippingInfo")): {}
}
export const cartReducer = ( state = initalState,action)=>{
  switch (action.type) {

    case ADD_TO_CART:
      const item = action.payload;
    

      const isItemExist = state.cartsItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartsItems: state.cartsItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      }
    
       else {
        return {
          ...state,
          cartsItems: [...state.cartsItems, item],
        };
      }
      case REMOVE_CART_ITEM:
        return {
          ...state,
          cartsItems: state.cartsItems.filter((i) => i.product !== action.payload),
        };
        case SAVE_SHIPPING_INFO:
          return {
            ...state,
            shippingInfo: action.payload,
          };
    
    default:
      return state;
  }
};