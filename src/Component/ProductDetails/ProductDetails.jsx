import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContext.js'
import toast from 'react-hot-toast'


export default function ProductDetails() {


  
  
  
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true
  };
  
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  
  let { id } = useParams()
  
  async function getProductDetails(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setDetails(data.data)
    setLoading(false)
  }
  
  let { addToCart , addToWishList } = useContext(CartContext)
  async function postToCart(id) {
    let { data } = await addToCart(id)
    if (data.status == 'success') {
      toast.success(data.message);
    }
  }

  async function postToWishList(id) {
    let { data } = await addToWishList(id)
    if (data.status == 'success') {
      toast.success(data.message);
      console.log(data);
    }
  }

  useEffect(() => {
    getProductDetails(id)
  }, [])

  return <>
    {loading ? <div className="">
      <Oval
        visible={true}
        height="100"
        width="100"
        color="#fff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass="d-flex justify-content-center mt-5"
      />
    </div> :
      <div className="row align-items-center">
        <div className="col-md-4">
          <Slider {...settings}>
            {details.images.map(image => <img src={image} alt={details.title} className='w-100' key={details.id} />)}
          </Slider>
        </div>
        <div className="col-md-8">
          <div className="details">
            <h3 className='h5'>{details.title}</h3>
            <p className='py-3'>{details.description}</p>
            <span className='font-sm text-main'>{details.category.name}</span>
            <div className="d-flex py-3 justify-content-between align-items-center">

              <span className='font-sm'>{details.price}EGP</span>
              <span className='font-sm'>
                <i className='fas fa-star rating-color me-1'></i>
                {details.ratingsAverage}
              </span>
            </div>
            <div className="test d-flex justify-content-between align-items-center">
              <button className='btn bg-main text-light btn-sm w-75' onClick={() => postToCart(details.id)}>Add To Cart</button>
              <i className='fas fa-heart btn btn-danger' onClick={() => postToWishList(details.id)}></i>
            </div>

          </div>
        </div>
      </div>
    }
  </>
}
