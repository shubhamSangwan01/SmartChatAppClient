import React from 'react'
import '../styles/loginNavbar.css'

const LoginNavbar = ({handleFormTypeChange}) => {
  return (
    <div className='loginNavbar__outer'>
    <div className='loginNavbar__left'>
        <ul className='loginNavbar__list'>
            <li>Home</li>
            <li>About</li>
            <li>Blog</li>
            <li>Pages</li>
            <li>Contact</li>
        </ul>
    </div>
    <div className='loginNavbar__right'>
        <ul className='loginNavbar__list'>
            <li>English</li>
            <li className='loginNavbar_button' onClick={()=>handleFormTypeChange('login')}>Sign In</li>
            <li className='loginNavbar_button'  onClick={()=>handleFormTypeChange('register')}>Register</li>
        </ul>
    </div>
    </div>
  )
}

export default LoginNavbar