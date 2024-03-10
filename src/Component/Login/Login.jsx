import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { UserContext } from '../../Context/UserContext.js'

export default function Login() {
  
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  let navigate = useNavigate()

  let {setUserToken} = useContext(UserContext)

  async function signinSubmit(values) {
    setLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .catch((err) => {
      setApiError(err.response.data.message)
      setLoading(false);
    })

    if(data.message == 'success') {
      setLoading(false);
      setApiError(null);
      localStorage.setItem('userToken' , data.token)
      setUserToken(data.token);
      navigate('/');
    }
  }


  let validationSchema = Yup.object({
    email: Yup.string().email('Ex: ososmeedo@gmail.com').required('Email is Required'),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, `Password should containsat least one alphabetic character, at least one digit , at least 8 characters long.`).required("Password is required"),
  })
  
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },validationSchema
    ,onSubmit: signinSubmit
  })
  
  
  return <>
    <div className="w-75 mx-auto py-4">
      <h2 className='mb-md-3'>Login Now</h2>
      <form onSubmit={formik.handleSubmit}> 
        {apiError ? <div className='alert alert-danger'>{apiError}</div> : ''}

        <label htmlFor="email">Email : </label>
        <input type="email" id='email' name='email' className='form-control mb-md-3' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}
        
        <label htmlFor="password">Password : </label>
        <input type="password" id='password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-md-3'/>
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password}</div> : null}

        
        {loading ? <button className='btn bg-main text-light' type='button'><Oval
          visible={true}
          height="25"
          width="25"
          color="#fff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          /></button> :
        <button className='btn bg-main text-light' type='submit' disabled={!(formik.isValid && formik.dirty)}>Submit</button>
        }
        <Link to={'/register'} className='ms-md-2 text-decoration-none btn'>Register Now</Link>
        
        
      </form>
      <Link to={"/forgetpassword"} className='ms-md-2 btn btn-sm ps-0 text-primary'> forget password ?</Link><br />
    </div>
  </>
}
