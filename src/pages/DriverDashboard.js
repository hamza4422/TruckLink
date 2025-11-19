import React, { useEffect, useState, useContext } from "react";
import "../styles/DriverDashboard.css";
import { LanguageContext } from "../components/LanguageContext";
import dashboardText from "../translations/dashboardText";

const API = "http://localhost:5000";

const DriverDashboard = () => {
  const [driver, setDriver] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const { lang } = useContext(LanguageContext);
  const t = dashboardText[lang];

  useEffect(() => {
    const email = localStorage.getItem("driverEmail");
    if (!email) return;

    fetch(`${API}/getDriver?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "not_found") {
          setDriver({
            ...data,
            locations: data.locations ? data.locations.split(",") : [],
          });
        }
      });
  }, []);

  if (!driver) return <h1 className="dash-loading">{t.loading}</h1>;

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);
    form.append("email", driver.email);

    const res = await fetch(`${API}/uploadImage`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (data.status === "success") {
      const updated = { ...driver, imageUrl: data.imageUrl };
      setDriver(updated);
      localStorage.setItem("driverData", JSON.stringify(updated));
    }
  };

  const handleSave = async () => {
    const res = await fetch(`${API}/updateDriver`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driver),
    });

    const data = await res.json();

    if (data.status === "success") {
      alert(t.saveSuccess);
      setEditMode(false);
      localStorage.setItem("driverData", JSON.stringify(driver));
    } else {
      alert(t.saveError);
    }
  };

  return (
    <div className="dash-wrapper">
      <div className="dash-card">
        <div className="dash-image-container">
          <img
            src={`${API}/${driver.imageUrl}`}
            alt="truck"
            className="dash-image"
          />

          <label className="dash-upload-btn">
            {t.changeImage}
            <input type="file" accept="image/*" onChange={handleUpload} />
          </label>
        </div>

        {!editMode ? (
          <div className="dash-info">
            <div className="dash-row">
              <span>{t.name}:</span>
              <b>{driver.fname}</b>
            </div>

            <div className="dash-row">
              <span>{t.email}:</span>
              <b>{driver.email}</b>
            </div>

            <div className="dash-row">
              <span>{t.phone}:</span>
              <b>{driver.phoneNumber}</b>
            </div>

            <div className="dash-row">
              <span>{t.regions}:</span>
              <b>{driver.locations.join(", ")}</b>
            </div>

            <div className="dash-desc-box">
              <span>{t.description}:</span>
              <p>{driver.description}</p>
            </div>

            <button
              className="dash-edit-btn"
              onClick={() => setEditMode(true)}
            >
              {t.editButton}
            </button>
          </div>
        ) : (
          <div className="dash-edit">
            <input
              type="text"
              value={driver.fname}
              onChange={(e) =>
                setDriver({ ...driver, fname: e.target.value })
              }
              placeholder={t.name}
            />

            <input
              type="text"
              value={driver.phoneNumber}
              onChange={(e) =>
                setDriver({ ...driver, phoneNumber: e.target.value })
              }
              placeholder={t.phone}
            />

            <textarea
              value={driver.description}
              onChange={(e) =>
                setDriver({ ...driver, description: e.target.value })
              }
              placeholder={t.description}
            />

            <button className="dash-save-btn" onClick={handleSave}>
              {t.saveButton}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
