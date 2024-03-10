import React, { useContext, useState } from 'react'
import styles from './VerifyCode.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { UserContext } from '../../Context/UserContext.js'
import { Navigate, useNavigate } from 'react-router-dom';

export default function VerifyCode() {

  let { setUserToken } = useContext(UserContext)
  const [apiError, setApiError] = useState(null)
  let navigate = useNavigate()

  async function verifyCode(values) {
    
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
    .catch((err) => {
      setApiError(err.message);
      console.log(err);
    })
    console.log(data);
    
    if (data.status == "Success") {
      
      navigate(`/resetpassword`)
      
    }
    
  }


  let formik = useFormik({
    initialValues: {
      resetCode: ''
    }, onSubmit: verifyCode
  })


  return <>
    <div className="w-75 mx-auto py-3">
      <h2>VerifyCode</h2>
      {apiError ? <div className='alert alert-danger'>{apiError}</div> : ''}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="resetCode">Reset Code :</label>
        <input type="text" name='resetCode' id='resetCode' onChange={formik.handleChange} className='form-control mb-3' />
        
        <button type='submit' disabled={!(formik.dirty)} className='btn bg-main text-light'>Verify</button>
      </form>
    </div>
  </>
}
