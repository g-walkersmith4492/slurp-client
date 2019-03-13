import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password" className="nav-link">Change Password</Link>
    <Link to="/sign-out" className="nav-link">Sign Out</Link>
    <Link to="/show-reviews" className="nav-link">Slurp Reviews</Link>
    <Link to="/create-review" className="nav-link">Review a Bowl</Link>
    <Link to="/search-ramen" className="nav-link"> Search Restaurants</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up" className="nav-link">Sign Up</Link>
    <Link to="/sign-in" className="nav-link">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/" className="nav-link">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1 className="slurp-title">SLURP</h1> <img className="slurp-icon" src="http://www.miragoround.works/wp-content/uploads/2017/01/Ramen-with-logo1.gif" alt="ramen-bowls" />
    <nav>
      <section className="username-box">{ user && <span>Welcome, {user.email}</span>}</section>
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
