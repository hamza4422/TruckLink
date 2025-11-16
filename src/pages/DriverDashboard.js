import React, { useState, useEffect } from "react";
import "../styles/DriverDashboard.css";

const DriverDashboard = () => {
  const [driver, setDriver] = useState({
    fname: "",
    email: "",
    phoneNumber: "",
    locations: [],
    description: "",
    imageUrl: "" 
  });

  const [editMode, setEditMode] = useState(false);

  
  useEffect(() => {
    const saved = localStorage.getItem("driverData");
    if (saved) setDriver(JSON.parse(saved));
  }, []);

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    setDriver((prev) => ({
      ...prev,
      imageUrl: imageURL
    }));

    localStorage.setItem(
      "driverData",
      JSON.stringify({ ...driver, imageUrl: imageURL })
    );
  };

  
  const handleSave = () => {
    localStorage.setItem("driverData", JSON.stringify(driver));
    setEditMode(false);
  };

  return (
    <div className="dash-wrapper">

      <h1>لوحة التحكم</h1>

      
      <div className="dash-image-box">
        <img
          src={
            driver.imageUrl && driver.imageUrl !== ""
              ? driver.imageUrl
              : "/default_truck.jpg"
          }
          alt="truck"
          className="dash-image"
        />

        <label className="upload-btn">
          رفع صورة جديدة
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

     
      {!editMode && (
        <div className="dash-info">
          <p><strong>الاسم:</strong> {driver.fname}</p>
          <p><strong>الإيميل:</strong> {driver.email}</p>
          <p><strong>رقم الهاتف:</strong> {driver.phoneNumber}</p>

          <p><strong>المناطق:</strong></p>
          <ul>
            {driver.locations.map((loc, index) => (
              <li key={index}>{loc}</li>
            ))}
          </ul>

          <p><strong>الوصف:</strong> {driver.description}</p>

          <button className="edit-btn" onClick={() => setEditMode(true)}>
            تعديل البيانات
          </button>
        </div>
      )}

      
      {editMode && (
        <div className="dash-edit">
          <input
            type="text"
            value={driver.fname}
            onChange={(e) =>
              setDriver({ ...driver, fname: e.target.value })
            }
            placeholder="الاسم"
          />

          <input
            type="email"
            value={driver.email}
            onChange={(e) =>
              setDriver({ ...driver, email: e.target.value })
            }
            placeholder="الإيميل"
          />

          <input
            type="text"
            value={driver.phoneNumber}
            onChange={(e) =>
              setDriver({ ...driver, phoneNumber: e.target.value })
            }
            placeholder="رقم الهاتف"
          />

          <textarea
            value={driver.description}
            onChange={(e) =>
              setDriver({ ...driver, description: e.target.value })
            }
            placeholder="الوصف"
          />

          <button className="save-btn" onClick={handleSave}>
            حفظ التعديلات
          </button>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
