import React, { useEffect, useState } from "react";
import "../styles/Trucks.css";
import TruckCard from "../components/Truckcard";
import driversData from "../data/users.json"; // مؤقتًا

const Trucks = () => {
  const [drivers, setDrivers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setDrivers(driversData); // تحميل البيانات
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
