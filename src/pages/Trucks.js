import React, { useEffect, useState } from "react";
import "../styles/Trucks.css";
import TruckCard from "../components/TruckCard";

const API = "http://localhost:5000";

const Trucks = () => {
  const [drivers, setDrivers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
  fetch(`${API}/drivers`)
    .then((res) => res.json())
    .then((data) => {
      const formatted = data.map((d) => ({
        ...d,
        locations:
          typeof d.locations === "string"
            ? d.locations.split(",")
            : Array.isArray(d.locations)
            ? d.locations
            : [] 
      }));

      setDrivers(formatted);
    })
    .catch((err) => console.error("Error loading drivers:", err));
}, []);


  const filteredDrivers =
    filter === "all"
      ? drivers
      : drivers.filter((d) => d.locations.includes(filter));

  return (
    <div className="trucks-page">

      <h1 className="title">ابحث عن شاحنة</h1>

      <div className="filter-container">
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">كل المناطق</option>
          <option value="beirut">بيروت</option>
          <option value="mountLebanon">جبل لبنان</option>
          <option value="north">الشمال</option>
          <option value="south">الجنوب</option>
          <option value="bekaa">البقاع</option>
          <option value="nabatieh">النبطية</option>
        </select>
      </div>

      <div className="trucks-grid">
        {filteredDrivers.map((driver, index) => (
          <TruckCard key={index} driver={driver} />
        ))}
      </div>
    </div>
  );
};

export default Trucks;
