import React, { Fragment,useEffect } from 'react'
// import { CgMouse } from 'react-icons/cg'
import Image from '../../images/home.png'
import ProductCard from './ProductCard.js'
import MetaData from '../layout/MetaData.js'
import './Home.css'
import { getProduct,clearErrors } from '../../action/ProductsAction'
import {useSelector,useDispatch} from 'react-redux'
 import Loader from '../layout/Loader/Loader'
import { useAlert } from "react-alert";
const Home = () => {
    const alert = useAlert();
    const dispatch=useDispatch();
    const {loading,error,products}=useSelector((state)=>state.products)
    useEffect(()=>{
        if (error) {
        alert.error(error);
        dispatch(clearErrors());
        }
        dispatch(getProduct())
    }, [ dispatch ,error,alert])
    // const product={
    //     name:"Blue Tshirt",
    //     images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
    //     price:"₹3000",
    //     _id:"swastik"
    // }
    return <Fragment>
        {loading?(
            // "loading"
            <Loader/>
            ):(
            <Fragment>
            <MetaData title="ECOMERCE"/>
            <section className="home">
            <div className="container" id="leftContainer">
                <h1>Live Your Life In</h1>
                <h2>A New Style! </h2>
                <p>they say first impression is the last impression.Don't wait,Bless yourself
                    yourselfwith perfect clothing.
                </p>
                <button>Explore Now →</button>
            </div>
            <div className="container" id="rightContainer">
                <img src={Image} alt=""/>
            </div>
            </section>
            <h2 className="homeHeading">Featured Products</h2>
            <div className="container1" id="container">
                
               {products && products.map((product)=> <ProductCard product={product} key={product._id}/>)} 
               
               
            </div>
            </Fragment>
        )}
    </Fragment>
    
}

export default Home
