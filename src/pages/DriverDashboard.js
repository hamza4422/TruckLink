import React, { useEffect, useState, useContext } from "react";
import "../styles/DriverDashboard.css";
import dashboardText from "../translations/dashboardText";
import { LanguageContext } from "../components/LanguageContext";

const DriverDashboard = () => {
  const [driver, setDriver] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { lang } = useContext(LanguageContext);
  const t = dashboardText[lang];

  useEffect(() => {
    const stored = localStorage.getItem("driverData");
    if (stored) setDriver(JSON.parse(stored));
  }, []);

  if (!driver) return <h1 className="dash-loading">{t.loading}</h1>;

  const handleSave = () => {
    localStorage.setItem("driverData", JSON.stringify(driver));
    alert(t.save);
    setEditMode(false);
  };

  return (
    <div className="dash-wrapper" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="dash-card">

        <div className="dash-image-container">
          <img src={driver.imageUrl} alt="truck" className="dash-image" />
        </div>

        {!editMode ? (
          <div className="dash-info">

            <div className="dash-row"><span>{t.name}:</span><b>{driver.fname}</b></div>
            <div className="dash-row"><span>{t.email}:</span><b>{driver.email}</b></div>
            <div className="dash-row"><span>{t.phone}:</span><b>{driver.phoneNumber}</b></div>
            <div className="dash-row"><span>{t.locations}:</span><b>{driver.locations.join(", ")}</b></div>

            <div className="dash-desc-box">
              <span>{t.description}:</span>
              <p>{driver.description}</p>
            </div>

            <button className="dash-edit-btn" onClick={() => setEditMode(true)}>
              {t.edit}
            </button>

          </div>
        ) : (
          <div className="dash-edit">

            <input
              type="text"
              value={driver.fname}
              onChange={(e) => setDriver({ ...driver, fname: e.target.value })}
            />

            <input
              type="text"
              value={driver.phoneNumber}
              onChange={(e) =>
                setDriver({ ...driver, phoneNumber: e.target.value })
              }
            />

            <textarea
              value={driver.description}
              onChange={(e) =>
                setDriver({ ...driver, description: e.target.value })
              }
            />

            <button className="dash-save-btn" onClick={handleSave}>
              {t.save}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
