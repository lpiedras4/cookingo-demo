import React from 'react'
import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';  
const Wrapper = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Wrapper
