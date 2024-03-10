import React, { useEffect } from 'react'
import styles from './Brands.module.css'
import { getBrands } from '../../Redux/BrandsSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { Oval } from 'react-loader-spinner'
export default function Brands() {

  let { brands, isLoading } = useSelector(({ brand }) => brand)


  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands())
  }, [])

  return <>
    <h2>Brands</h2>
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
    </div> :
      <div className="row py-5">
        {brands.map((brand) =>
          <div key={brand._id} className="col-md-2">
            <div className="product">
              <img src={brand.image} className='w-100' alt={brand.name} />
              <p>{brand.name}</p>
            </div>
          </div>
        )}
      </div>
    }
  </>
}
