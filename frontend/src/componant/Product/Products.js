import React, { Fragment,useEffect,useState } from 'react'
import './Products.css'
import ProductCard from '../Home/ProductCard'
import MetaData from '../layout/MetaData.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProduct,clearErrors } from '../../action/ProductsAction'
import {useSelector,useDispatch} from 'react-redux'
 import Loader from '../layout/Loader/Loader'
import { useAlert } from "react-alert";
import {useParams} from 'react-router-dom'
import Pagination from "react-js-pagination";
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
const Products = () => {
    const {keyword}=useParams();
    const alert = useAlert();
    const [price, setPrice] = useState([0, 100000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];
    const dispatch=useDispatch();
   const [currentPage, setCurrentPage] = useState(1);
    const {loading,error,products,productCount,resultPerPage}=useSelector((state)=>state.products)

    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };
     
    useEffect(()=>{
        if (error) {
        alert.error(error);
        dispatch(clearErrors());
        }
        dispatch(getProduct(keyword,currentPage,price,category, ratings))
    }, [ dispatch,keyword,currentPage,price,category, ratings ,error,alert])
    return (
        <Fragment>
        {loading?(
            // "loading"
            <Loader/>
            ):(
            <Fragment>
            <MetaData title="ECOMERCE"/>

            <h2 className="productsHeading">Products</h2>
            <div className="products" >
                
               {products && products.map((product)=> <ProductCard product={product} key={product._id}/>)} 
            </div>
            <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

<Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            
            </div>



             {resultPerPage < productCount && ( 
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
               
              />
            </div>
            
           )} 
            </Fragment>
        )}
    </Fragment>
    )
}

export default Products
