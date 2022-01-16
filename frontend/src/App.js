import {useState,useEffect} from 'react'
import './App.css';
import Header from './componant/layout/Header1/Header'
import Footer from './componant/layout/Footer/Footer'
import ProductDetails from './componant/Product/ProductDetails.js'
import Products from './componant/Product/Products.js'
import Search from './componant/Product/Search.js'
import Home from './componant/Home/Home.js'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import webfont from 'webfontloader'
import React from 'react'
import LoginSignUp from './componant/user/LoginSignUp';
import Profile from './componant/user/Profile.js';
import UpdateProfile from './componant/user/UpdateProfile';
import UpdatePassword from './componant/user/UpdatePassword';
import ForgotPassword from './componant/user/ForgotPassword';
import ResetPassword from './componant/user/ResetPassword';
import store from "./Store"
import { loadUser } from './action/UserAction';
import UserOption from './componant/layout/Header1/UserOption.js'
import { useSelector } from "react-redux";
import ProtectedRoute from './componant/ProtectedRoute';
import Cart from './componant/Cart/Cart';
import Shipping from './componant/Cart/Shipping.js';
import ConfirmOrder from './componant/Cart/ConfirmOrder';
import Payment from './componant/Cart/Payment';
import OrderSuccess from './componant/Cart/OrderSuccess';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'
import MyOrder from './componant/order/MyOrder';
import OrderDetails from './componant/order/OrderDetails';
import Dashboard from './componant/admin/Dashboard.js';
import ProductList from './componant/admin/ProductList';
import NewProduct from './componant/admin/NewProduct';
import UpdateProduct from './componant/admin/UpdateProduct';
import OrderList from './componant/admin/OrderList';
import ProcessOrder from './componant/admin/ProcessOrder';
import UserList from './componant/admin/UserList';
import UpdateUser from './componant/admin/UpdateUser';
import ProductReviews from './componant/admin/ProductReviews';
import About from './componant/layout/About/About';
import Contact from './componant/layout/Contact/Contact';
import PageNotFound from './componant/layout/PageNotFound/PageNotFound';
// import Loader from './componant/layout/Loader/Loader';
function App() { 
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
 useEffect(()=>
  {
    webfont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
    store.dispatch(loadUser());
    getStripeApiKey()
  },[])

  //window.addEventListener("contextmenu", (e) => e.preventDefault());
    return (
      
    <Router>
      <Header/>

      {isAuthenticated && <UserOption user={user} />} 
  <Routes>
   <Route exact path="/"  element={<Home/>} />
   <Route exact path="/products/:id" element={<ProductDetails/>} />
   <Route exact path="/products" element={<Products/>} />
   <Route exact path="/about" element={<About/>} />
   <Route exact path="/contact" element={<Contact/>} />
   <Route exact path="*" element={<PageNotFound/>} />
   <Route path="/product/:keyword" element={<Products/>} />
   <Route exact path="/search" element={<Search/>} />
   <Route exact path="/login" element={<LoginSignUp/>} />
 <Route exact path="/cart" element={<Cart/>} />

 


   <Route
            
            exact path="/account"
            element={
              <ProtectedRoute>
                <Profile/> 
              </ProtectedRoute>
            }
          />
    <Route
            
            exact path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping/> 
              </ProtectedRoute>
            }
          />  
    <Route
            
            exact path="/order/confirm"
            element={
              <ProtectedRoute>
               <ConfirmOrder/> 
              </ProtectedRoute>
            }
          />  
   <Route
            
            exact path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile/> 
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/success"
            element={
              <ProtectedRoute>
               <OrderSuccess/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/orders"
            element={
              <ProtectedRoute>
               <MyOrder/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/order/:id"
            element={
              <ProtectedRoute>
               <OrderDetails/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/admin/dashboard"
            element={
              <ProtectedRoute>
               <Dashboard/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/admin/products"
            element={
              <ProtectedRoute>
               <ProductList/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/admin/product"
            element={
              <ProtectedRoute>
               <NewProduct/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/admin/product/:id"
            element={
              <ProtectedRoute>
               <UpdateProduct/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/admin/orders"
            element={
              <ProtectedRoute>
               <OrderList/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/admin/order/:id"
            element={
              <ProtectedRoute>
               <ProcessOrder/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/admin/users"
            element={
              <ProtectedRoute>
               <UserList/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/admin/user/:id"
            element={
              <ProtectedRoute>
               <UpdateUser/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/admin/reviews"
            element={
              <ProtectedRoute>
               <ProductReviews/>
              </ProtectedRoute>
            }
          />
   <Route
            
            exact path="/process/payment"
            element={
              <ProtectedRoute>
                {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                 <Payment/>
                </Elements>
                )}
              </ProtectedRoute>
            }
          />


   
        <Route exact path="/password/forgot" element={<ForgotPassword/>} />
        <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
        <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
      
   {/* <Route exact path="/sad" element={<Loader/>} /> */}
   </Routes>
   <Footer/>
    </Router>
   
  );
}

export default App;
