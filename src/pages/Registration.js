import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Registration.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { BiSolidLogIn } from "react-icons/bi";
import { MdOutlineAlternateEmail, MdOutlinePhone } from "react-icons/md";

const Registration = () => {
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [description, setDescription] = useState('');
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();
  const imageUrl = "uploads/truck_default.jpg"; 

  const handleLocationChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setLocations([...locations, value]);
    } else {
      setLocations(locations.filter((loc) => loc !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const registrationData = {
      fname,
      email,
      phoneNumber,
      password,
      locations,
      description,
      imageUrl
    };

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigate("/login"); 
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Register <BiSolidLogIn /></h1>

        <div className="input-box">
          <input type="text" placeholder="Full name" value={fname} onChange={(e) => setFname(e.target.value)} required />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input type="number" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          <MdOutlinePhone className="icon" />
        </div>

        <div className="input-box">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <MdOutlineAlternateEmail className="icon" />
        </div>

        <div className="input-box">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <FaLock className="icon" />
        </div>

        <div className="input-box">
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <FaLock className="icon" />
        </div>

        <div className="locations">
          <p>اختر المناطق التي تعمل فيها:</p>
          <label><input type="checkbox" value="beirut" onChange={handleLocationChange} /> بيروت</label>
          <label><input type="checkbox" value="mountLebanon" onChange={handleLocationChange} /> جبل لبنان</label>
          <label><input type="checkbox" value="north" onChange={handleLocationChange} /> الشمال</label>
          <label><input type="checkbox" value="south" onChange={handleLocationChange} /> الجنوب</label>
          <label><input type="checkbox" value="bekaa" onChange={handleLocationChange} /> البقاع</label>
          <label><input type="checkbox" value="nabatieh" onChange={handleLocationChange} /> النبطية</label>
        </div>

        <textarea className="desc-input" placeholder="اضف بعض التفاصيل..." value={description} onChange={(e) => setDescription(e.target.value)} />

        <button type="submit">Register</button>

        <div className="register-link">
          <p>I have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
