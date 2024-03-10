import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../Context/CartContext.js'
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Cart() {

  let { getCartItems, deleteCartItems, updateCartItems } = useContext(CartContext);
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  async function getItems() {
    let { data } = await getCartItems()
    setCart(data);
    setLoading(false);
  }

  async function deleteItem(id) {
    let { data } = await deleteCartItems(id)
    setCart(data);
    setLoading(false);
  }

  async function updateItem(id, count) {
    if (count < 1) {
      deleteItem(id)
    } else {
      let { data } = await updateCartItems(id, count)
      setCart(data);
      setLoading(false);
    }

  }



  useEffect(() => {
    getItems();
  }, [])


  return <>
    <div className="bg-light p-2 mt-5">
      <h2>Cart</h2>

      {loading ? <div className='loading'>
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div> : cart ? <>
        <p className='text-main'>Number Of Cart Items :  {cart.numOfCartItems}</p>
        <p className='text-main'>Total Cart Price : {cart.data.totalCartPrice} EGP</p>
        {cart.data.products.map(product => <div key={product.product.id} className="row align-items-center p-2 border-1 border-bottom m-0">
          <div className="col-md-1">
            <div className="img">
              <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
            </div>
          </div>
          <div className="col-md-10">
            <div className="item">
              <h3 className='h5 fw-bold'>{product.product.title.split(' ').splice(0, 4).join(' ')}</h3>
              <p className='text-main fw-bold'>Price : {product.price} EGP</p>
              <button className='btn' onClick={() => deleteItem(product.product.id)}><i className='fas fa-trash-can text-danger me-2'></i>Remove</button>
            </div>
          </div>
          <div className="col-md-1">
            <div className="count">
              <button className='btn brdr p-2' onClick={() => updateItem(product.product.id, product.count + 1)}>+</button>
              <span className='mx-2'>{product.count}</span>
              <button className='btn brdr p-2' onClick={() => updateItem(product.product.id, product.count - 1)}>-</button>
            </div>
          </div>
        </div>)}
        <Link to={`/shippingaddress/${cart.data._id}`} className='btn bg-main text-light  m-3'>Online Payment</Link>
      </> : <h2>Cart is Empty ...</h2>}
    </div>
  </>
}
