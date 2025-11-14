import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { FaLock } from 'react-icons/fa';
import { BiSolidLogIn } from "react-icons/bi";
import { MdOutlineAlternateEmail } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if(data.success){
        alert(`Welcome ${data.user.fname}`);
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Error connecting to server");
    }
  }

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login <BiSolidLogIn /></h1>
        <div className='input-box'>
          <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
          <MdOutlineAlternateEmail className='icon' />
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
          <FaLock className='icon'/>
        </div>
        <button type='submit'>Login</button>
        <div className='register-link'>
          <p>Don't have an account? <Link to="/registration">Register</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login;
