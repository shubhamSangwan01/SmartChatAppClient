import React from 'react'
import '../styles/Navbar.css'

const Navbar = ({handleFormTypeChange}) => {
  return (
    <div className='Navbar__outer'>
      <div className='Navbar__left'>
          <ul className='Navbar__list'>
              <a href="#IntroMain">Home</a>
              <a href="#Intro_features">Features</a>
              <a href="">About Us</a>
              <a href="#Footer__outer">Contact</a>
          </ul>
      </div>
      <div className='Navbar__right'>
          <ul className='Navbar__list'>
              <a className='Navbar_button' onClick={()=>handleFormTypeChange('login')}>Sign In</a>
              <a className='Navbar_button' onClick={()=>handleFormTypeChange('register')}>Register</a>
          </ul>
      </div>
    </div>
  )
}

export default Navbar