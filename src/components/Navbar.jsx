import React from 'react'
import '../styles/Navbar.css'

const Navbar = ({handleFormTypeChange}) => {
  return (
    <div className='Navbar__outer'>
    <div className='Navbar__left'>
        <ul className='Navbar__list'>
            <li>Home</li>
            <li>About</li>
            <li>Blog</li>
            <li>Pages</li>
            <li>Contact</li>
        </ul>
    </div>
    <div className='Navbar__right'>
        <ul className='Navbar__list'>
            <li>English</li>
            <li className='Navbar_button' onClick={()=>handleFormTypeChange('login')}>Sign In</li>
            <li className='Navbar_button'  onClick={()=>handleFormTypeChange('register')}>Register</li>
        </ul>
    </div>
    </div>
  )
}

export default Navbar