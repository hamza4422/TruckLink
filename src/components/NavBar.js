import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import '../styles/NavBar.css'
import logo from '../assets/trucklink_inverted.png'
import ReorderIcon from '@mui/icons-material/Reorder';
const NavBar = () => {
  const [openLinks,setOpenLinks]=useState(false);
  const toggleNavbar=()=>{
    setOpenLinks(!openLinks);
  }
  const hideList =()=>{
    if(openLinks){
      setOpenLinks(false);
    }
  }
  return (
    <header className='header'>
        <div className='logo'>
        <Link to ="/"><img src={logo}/></Link>
        </div>
        <nav className={`navbar ${openLinks ? "open":""}`}>
            <button onClick={toggleNavbar} className='menuButton'><ReorderIcon/></button>
            <div className='link'>
              <Link onClick={hideList} to="/" >Home</Link>
              <Link onClick={hideList} to="/about" >About</Link>
              <Link onClick={hideList} to="/trucks">Trucks</Link>
              <Link onClick={hideList} to="/login">Login</Link>
            </div>
        </nav>
        
    </header>
  )
}

export default NavBar