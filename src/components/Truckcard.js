import React, { useContext } from "react";
import "../styles/TruckCard.css";
import { FaWhatsapp } from "react-icons/fa";
import { LanguageContext } from "../components/LanguageContext";
import trucksText from "../translations/trucksText";

const API = "http://localhost:5000";

const TruckCard = ({ driver }) => {
  const { lang } = useContext(LanguageContext);
  const labels = trucksText[lang].regionsLabels;

  const { fname, phoneNumber, locations, description } = driver;

  const whatsappLink = `https://wa.me/961${phoneNumber}?text=${
    lang === "en"
      ? "Hello, I would like to ask about your truck via TruckLink."
      : "مرحباً، أود الاستفسار عن شاحنتك عبر TruckLink."
  }`;

  const getLocationLabel = (code) => labels[code] || code;

  return (
    <div className="truck-card">
      <img
        className="truck-image"
        src={`${API}/${driver.imageUrl}`}
        alt="truck"
      />

      <h2 className="truck-name">{fname}</h2>

      <p className="truck-phone">📞 {phoneNumber}</p>

      <div className="truck-locations">
        {locations.map((loc, index) => (
          <span key={index} className="location-tag">
            {getLocationLabel(loc)}
          </span>
        ))}
      </div>

      <p className="truck-desc">{description}</p>

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <button className="whatsapp-btn">
          <FaWhatsapp />{" "}
          {lang === "en" ? "Contact via WhatsApp" : "تواصل عبر واتساب"}
        </button>
      </a>
    </div>
  );
};

export default TruckCard;
