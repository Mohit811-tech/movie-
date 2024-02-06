import React from 'react'
import Logo from '../images/logo.png'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='flex border pl-8 py-3 m-0 space-x-10 items-center bg-black'>

      <Link to='/'>
        <img className='w-20 ' src={Logo} alt="logo" />
      </Link>
      <Link to='/' className='font-bold text-xl text-white'>Movies</Link>
      <Link to='/favourite' className='font-bold text-xl text-white'>Favourite</Link>

    </div>
  )
}

export default NavBar