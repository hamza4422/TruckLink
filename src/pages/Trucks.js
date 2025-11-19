import React, { useEffect, useState, useContext } from "react";
import "../styles/Trucks.css";
import TruckCard from "../components/TruckCard";
import users from "../data/user.json";
import trucksText from "../translations/trucksText";
import { LanguageContext } from "../components/LanguageContext";
console.log("Drivers loaded:", users);

const Trucks = () => {
  const [drivers, setDrivers] = useState([]);
  const [filter, setFilter] = useState("all");

  const { lang } = useContext(LanguageContext);
  const t = trucksText[lang];

  useEffect(() => {
    const formatted = users.drivers.map((d) => ({
      ...d,
      locations: Array.isArray(d.locations)
        ? d.locations
        : typeof d.locations === "string"
        ? d.locations.split(",")
        : []
    }));

    setDrivers(formatted);
  }, []);


  const filteredDrivers =
    filter === "all"
      ? drivers
      : drivers.filter((d) => d.locations.includes(filter));

  return (
    <div className="trucks-page" dir={lang === "ar" ? "rtl" : "ltr"}>

      <h1 className="title">{t.title}</h1>

      <div className="filter-container">
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">{t.regions.all}</option>
          <option value="beirut">{t.regions.beirut}</option>
          <option value="mountLebanon">{t.regions.mountLebanon}</option>
          <option value="north">{t.regions.north}</option>
          <option value="south">{t.regions.south}</option>
          <option value="bekaa">{t.regions.bekaa}</option>
          <option value="nabatieh">{t.regions.nabatieh}</option>
        </select>

      </div>

      <div className="trucks-grid">
        {filteredDrivers.map((driver) => (
          <TruckCard key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  );
};

export default Trucks;
