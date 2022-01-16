import React, { useState, Fragment } from 'react'
import MetaData from "../layout/MetaData";
import { useNavigate  } from "react-router-dom";
import "./Search.css";
const Search = () => {
    let navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
          console.log(`/products/:${keyword}`)
        navigate(`/product/${keyword}`);
       
         
        
      } else {
        navigate('/products');
      }
    };
  
    return (
        <Fragment>
        <MetaData title="Search A Product -- ECOMMERCE" />
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search a Product ..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
      </Fragment>
    )
}

export default Search
