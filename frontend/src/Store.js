import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { newProductReducer, newReviewReducer, ProductDetailsReducer, productReducer, ProductReducer, productReviewsReducer, reviewReducer } from './reducers/ProductReducer';
import { forgotPasswordReducer, profileReducer, userReducer,allUsersReducer, userDetailsReducer } from './reducers/UserReducer';
import { cartReducer } from './reducers/CartReducer';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer,allOrdersReducer, orderReducer } from './reducers/OrderReducer';

const reducer=combineReducers({
products:ProductReducer,
ProductDetails:ProductDetailsReducer,
user:userReducer,
profile:profileReducer,
forgotPassword: forgotPasswordReducer,
cart:cartReducer,
newOrder: newOrderReducer,
myOrders: myOrdersReducer,
orderDetails: orderDetailsReducer,
newReview: newReviewReducer,
allOrders: allOrdersReducer,
allUsers: allUsersReducer,
newProduct: newProductReducer,
product: productReducer,
order: orderReducer,
userDetails: userDetailsReducer,
productReviews: productReviewsReducer,
review: reviewReducer
});
let initalState={
   
    cartsItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
    shippingInfo: localStorage.getItem("shippingInfo")? JSON.parse(localStorage.getItem("shippingInfo")): {},
};
const middleware=[thunk];
const store=createStore(
    reducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware)));
export default store;