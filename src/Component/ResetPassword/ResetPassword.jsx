import React, { useContext, useState } from 'react'
import styles from './ResetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { UserContext } from '../../Context/UserContext.js'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ResetPassword() {

  let { setUserToken } = useContext(UserContext);
  const [apiError, setApiError] = useState(null)
  let navigate = useNavigate()

  async function resetPassword(values) {
    let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .catch((err) => {
        setApiError(err.message)
      })
      .then((response) => {
        localStorage.setItem('userToken', response.token)
        setUserToken(localStorage.getItem('userToken'))
        navigate('/')
      })
  }

  let validationSchema = Yup.object({
    email: Yup.string().email('Ex: ososmeedo@gmail.com').required('Email is Required'),
    newPassword: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, `Password should containsat least one alphabetic character, at least one digit , at least 8 characters long.`).required("Password is required"),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    }, validationSchema,
    onSubmit: resetPassword
  })


  return <>
    <div className="w-75 mx-auto">
      <h2>ResetPassword</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input type="email" name='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}
        
        <label htmlFor='newPassword'>New Password :</label>
        <input type="text" name='newPassword' id='newPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' />
        {formik.errors.newPassword && formik.touched.newPassword ? <div className="alert alert-danger py-2">{formik.errors.newPassword}</div> : null}

        <button type='submit' className='btn bg-main btn-light text-light'>Change</button>
      </form>
    </div>
  </>
}
