import styles from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/freshcart-logo.svg'
import { useContext, useEffect, useState } from 'react'
import { CounterContext } from '../../Context/CounterContext.js'
import { UserContext } from '../../Context/UserContext.js'
import { CartContext } from '../../Context/CartContext.js'

export default function Navbar() {

  let { getCartItems } = useContext(CartContext);
  const [details, setDetails] = useState(null);

  async function getItems() {
    let { data } = await getCartItems()
    setDetails(data);
  }


  useEffect(() => {
    getItems()
  }, [])

  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-sticky z-3 top-0 start-0 end-0">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>
          <img src={logo} alt="fesh cart" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {userToken != null ? <>
              <li className="nav-item">
                <Link className="nav-link" to={'/'}>Home </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'cart'}>Cart <span className='bg-danger text-light rounded-circle'>{details ? details.numOfCartItems : ''}</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'products'}>Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'categories'}>Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'brands'}>Brands</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'wishlist'}>WishList</Link>
              </li>
            </> : ''}

          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab fa-instagram me-3 cursor-pointer'></i>
              <i className='fab fa-facebook me-3 cursor-pointer'></i>
              <i className='fab fa-tiktok me-3 cursor-pointer'></i>
              <i className='fab fa-twitter me-3 cursor-pointer'></i>
              <i className='fab fa-linkedin me-3 cursor-pointer'></i>
              <i className='fab fa-youtube me-3 cursor-pointer'></i>
            </li>
            {userToken != null ? <>
              <li className='nav-item'>
                <span className='nav-link cursor-pointer' onClick={logOut}>LogOut</span>
              </li>
            </> : <>
              <li className='nav-item'>
                <Link className='nav-link' to={'register'}>Regitser</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to={'login'}>Login</Link>
              </li>
            </>}
          </ul>
        </div>
      </div>
    </nav>
  </>
}
