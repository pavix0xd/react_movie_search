import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../main.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">MovieDB</Link>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/trending" className="nav-link">
          Trending
        </NavLink>
        <NavLink to="/favorites" className="nav-link">
          Favorites
        </NavLink>
        <NavLink to="/filter" className="nav-link">
          Filter Movies
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
