import React, { useContext, useEffect, useState } from 'react'
import styles from './WishList.module.css'
import { CartContext } from '../../Context/CartContext.js'
import { Oval } from 'react-loader-spinner';
import toast from 'react-hot-toast';
export default function WishList() {

  let { getWishItems , addToCart , removeItemFromWishList } = useContext(CartContext);

  const [loading, setLoading] = useState(true)
  const [wish, setWish] = useState(null)


  async function postToCart(id) {
    let { data } = await addToCart(id)
    if (data.status == 'success') {
      toast.success(data.message);
      removeFromCart(id)
    }
  }

  async function removeFromCart(id) {
    let { data } = await removeItemFromWishList(id)
    setWish(data);
  }

  async function getItems() {
    let { data } = await getWishItems();
    console.log(data);
    setWish(data);
    setLoading(false);
  }


  useEffect(() => {
    getItems();
  }, [])


  return <>
    <div className="bg-light p-2 mt-5">
      <h2>WishList</h2>
      {loading ? <div className='loading'>
        <Oval
          visible={true}
          height="100"
          width="100"
          color="#fff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass="d-flex justify-content-center mt-5"
        />
      </div> : <>
        {wish.data.map(item => <div key={item.id} className="row align-items-center p-2 border-1 border-bottom m-0">
          <div className="col-md-1">
            <div className="img">
              <img src={item.imageCover} className='w-100' alt="" />
            </div>
          </div>
          <div className="col-md-9">
            <h3 className='fw-bold h5'>{item.title.split(' ').slice(0,4).join(' ')}</h3>
            <p className='fw-bold text-main'>{item.price} EGP</p>
            <button className='btn' onClick={() => removeFromCart(item.id)}><i className='fas fa-trash-can me-1 text-danger'></i>Remove</button>
          </div>
          <div className="col-md-2">
            <button className='btn brdr' onClick={() => postToCart(item.id)}>add To Cart</button>
          </div>
        </div>)}

      </>}
    </div>
  </>
}
