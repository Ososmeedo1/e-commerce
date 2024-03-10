import React, { useContext, useEffect, useState } from 'react'
import styles from './FeaturedProducts.module.css'
import axios from 'axios'
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast';


export default function FeaturedProducts() {




  async function postToWishList(id) {
    let { data } = await addToWishList(id)
    if (data.status == 'success') {
      toast.success(data.message);
      console.log(data);
    }
  }

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  let { data, isLoading, isError, isFetching, refetch } = useQuery('featuredProducts', getProducts, {
    // refetchOnMount: false,
    // refetchOnWindowFocus: true,
    // staleTime: 50000
    // refetchInterval: 1000
    // enabled:false
  });


  let { addToCart , addToWishList } = useContext(CartContext)
  async function postToCart(id) {
    let { data } = await addToCart(id)
    if (data.status == 'success') {
      toast.success(data.message);
    }
  }

  


  return <>
    <h2>Featured Products</h2>
    {isLoading ? <div className="">
      <Oval
        visible={true}
        height="100"
        width="100"
        color="#fff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass="d-flex justify-content-center mt-5"
      />
    </div> : <div className='row gy-4'>
      {data?.data.data.map(product =>
        <div key={product.id} className="col-lg-2">
          <div className="product p-2">
            <Link to={`/productdetails/${product.id}`} className='text-decoration-none text-black'>
              <img src={product.imageCover} className='w-100' alt="Prodcut-image" />
              <span className='font-sm text-main'>{product.category.name}</span>
              <h3 className='h5'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
              <div className="d-flex py-3 justify-content-between align-items-center">
                <span className='font-sm'>{product.price}EGP</span>
                <span className='font-sm'>
                  <i className='fas fa-star rating-color me-1'></i>
                  {product.ratingsAverage}
                </span>
              </div>
            </Link>
            <div className="test d-flex justify-content-around align-items-center">
              <button onClick={() => postToCart(product.id)} className='btn bg-main text-light btn-sm w-50'>Add To Cart</button>
              <i onClick={() => postToWishList(product.id)}  className={`fas fa-heart btn btn-danger`} ></i>
            </div>
          </div>
        </div>
      )}
    </div>}
  </>
}
