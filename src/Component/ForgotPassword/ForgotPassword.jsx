import React from 'react'
import styles from './ForgotPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ForgotPassword() {


  let navigate = useNavigate();

  async function forgetPassword(values) {
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
    navigate('/verifycode')
  }

  let validationSchema = Yup.object({
    email: Yup.string().email('Ex: ososmeedo@gmail.com').required('Email is Required'),
  })


  let formik = useFormik({
    initialValues: {
      email: ''
    }, validationSchema,
    onSubmit: forgetPassword
  })

  return <>
    <div className="w-75 mx-auto py-2">
      <h2>Forgot Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name='email' id='email' className='form-control mb-3' onBlur={formik.handleBlur} onChange={formik.handleChange} />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}
        <button className='btn bg-main text-light' type='submit' disabled={!(formik.dirty)}>Reset</button>
      </form>
    </div>
  </>
}
