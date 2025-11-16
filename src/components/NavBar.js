import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';
import logo from '../assets/trucklink_inverted.png';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const [openLinks, setOpenLinks] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const driverData = localStorage.getItem("driverData");
    setIsLogged(!!driverData);
  }, [location]);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const hideList = () => {
    if (openLinks) setOpenLinks(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("driverData");
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to="/"><img src={logo} alt="logo"/></Link>
      </div>

      <nav className={`navbar ${openLinks ? "open" : ""}`}>
        <button onClick={toggleNavbar} className='menuButton'>
          <ReorderIcon/>
        </button>

        <div className='link'>
          <Link onClick={hideList} to="/">Home</Link>
          <Link onClick={hideList} to="/about">About</Link>
          <Link onClick={hideList} to="/trucks">Trucks</Link>

          
          {isLogged ? (
            <>
              <Link onClick={hideList} to="/dashboard">Dashboard</Link>
              <span onClick={handleLogout} className="logout-btn">Logout</span>
            </>
          ) : (
            <>
              <Link onClick={hideList} to="/login">Login</Link>
              <Link onClick={hideList} to="/registration">Register</Link>
            </>
          )}

        </div>
      </nav>
    </header>
  );
};

export default NavBar;
