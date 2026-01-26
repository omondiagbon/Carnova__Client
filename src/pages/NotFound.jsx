import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
   const handleHome = () =>{
    navigate("/")
   }

  return (
    <div>
        <h1>page not found</h1>
        <p>please navigete to home</p>
        <button onClick={handleHome}>home</button>
    </div>
  )
}

export default NotFound