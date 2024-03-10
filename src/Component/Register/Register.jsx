import React, { useState } from 'react'
import styles from './Register.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Oval } from 'react-loader-spinner'


export default function Register() {


  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  let navigate = useNavigate()

  async function registerSubmit(values) {
    setLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .catch((err) => {
      setApiError(err.response.data.message);
      setLoading(false)});
    if(data.message == 'success') {
      setLoading(false);
      setApiError(null);
      navigate('/login')
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string().required('Name is Required').min(3 , 'Min Length is 3').max(10, 'Max Length is 10'),
    email: Yup.string().required('Email is Required').email('Ex: ososmeedo@gmail.com'),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, `Password should containsat least one alphabetic character, at least one digit , at least 8 characters long.`).required("Password is required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'password and Re-Password don\'t match').required('Re-Password is required'),
    phone: Yup.string().required('Phone is Required').matches(/^01[0125][0-9]{8}/, 'Ex: 01060223508')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },validationSchema 
    ,onSubmit:registerSubmit
  })



  return <>
    <div className="w-75 mx-auto py-4">
      <h2 className='mb-md-3'>Register Now</h2>
      <form onSubmit={formik.handleSubmit}>

      {apiError ? <div className="alert alert-danger">{apiError}</div> : null}

        <label htmlFor="name">Name : </label>
        <input type="text" id='name' name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-md-3'/>
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger py-2">{formik.errors.name}</div> : null}

        <label htmlFor="email">Email : </label>
        <input type="email" id='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-md-3' />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email}</div> : null}

        <label htmlFor="password">Password : </label>
        <input type="password" id='password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-md-3'/>
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password}</div> : null}

        <label htmlFor="rePassword">Re-Password : </label>
        <input type="password" id='rePassword' name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-md-3'/>
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger py-2">{formik.errors.rePassword}</div> : null}

        <label htmlFor="phone">Phone : </label>
        <input type="tel" id='phone' name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-md-3' />
          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger py-2">{formik.errors.phone}</div> : null}

        {loading ? <button type='button' className='btn bg-main text-light'>
        <Oval
          visible={true}
          height="30"
          width="30"
          color="#fff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
</button>
        : <button type='submit' className='btn bg-main text-light' disabled={!(formik.isValid && formik.dirty)}>Register</button>}
        <Link to={'/login'} className='text-decoration-none btn ms-md-2'>Login Now</Link>

      </form>
    </div>
  </>
}









