import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import users from "../data/user.json";
import loginText from "../translations/loginText";
import { LanguageContext } from "../components/LanguageContext";
import { FaLock } from "react-icons/fa";
import { BiSolidLogIn } from "react-icons/bi";
import { MdOutlineAlternateEmail } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { lang } = useContext(LanguageContext);
  const t = loginText[lang];

  const handleSubmit = (e) => {
    e.preventDefault();

    const driver = users.drivers.find(
      (u) => u.email === email && u.password === password
    );

    if (!driver) {
      alert(t.wrong);
      return;
    }

    localStorage.setItem("driverData", JSON.stringify(driver));
    navigate("/dashboard");
  };

  return (
    <div className="wrapper" dir={lang === "ar" ? "rtl" : "ltr"}>
      <form onSubmit={handleSubmit}>
        <h1>{t.title} <BiSolidLogIn /></h1>

        <div className="input-box">
          <input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <MdOutlineAlternateEmail className="icon" />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>

        <button type="submit">{t.login}</button>

        <div className="register-link">
          <p>
            {t.noAccount} <Link to="/registration">{t.goRegister}</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
