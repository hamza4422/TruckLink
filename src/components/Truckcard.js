import React from "react";
import "../styles/TruckCard.css";
import { FaWhatsapp } from "react-icons/fa";
import defaultImage from "../assets/truck_default.jpg";

const TruckCard = ({ driver }) => {
  const { fname, phoneNumber, locations, description, imageUrl } = driver;

  const whatsappLink = `https://wa.me/961${phoneNumber}?text=مرحبا،%20اريد%20الاستفسار%20عبر%20TruckLink`;

  return (
    <div className="truck-card">
      <img
        className="truck-image"
        src={imageUrl && imageUrl !== "" ? imageUrl : defaultImage}
        alt="truck"
      />

      <h2 className="truck-name">{fname}</h2>

      <p className="truck-phone">📞 {phoneNumber}</p>

      <div className="truck-locations">
        {locations.map((loc, index) => (
          <span key={index} className="location-tag">
            {loc}
          </span>
        ))}
      </div>

      <p className="truck-desc">{description}</p>

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <button className="whatsapp-btn">
          <FaWhatsapp /> تواصل عبر واتساب
        </button>
      </a>
    </div>
  );
};

export default TruckCard;
