import React from 'react'
import notFoundImage from '../../Images/error.svg'

export default function Notfound() {
  return <>
  
    <figure  className=' d-flex justify-content-center align-items-center'>
        <img src={notFoundImage} alt=" Error Image" />
    </figure>

  </>
}
