import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const apiURL = "http://localhost:8000";

  useEffect(() => {
    // Check if the user is already logged in on component mount
    const token = localStorage.getItem("token");
    console.log("token :", token);
    if (!token) {
      // logout user
      console.log("logout");
      handleLogout();
    }
  }, []);

  // Handle logout
  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    // redirect to homepage aka. login page
    navigate("/login");
  }

  // Handle form submission
  async function handleSubmitLogin(event, username, password) {
    event.preventDefault();
    console.log("value :", username, password);
    try {
      const response = await axios.post(`${apiURL}/api/auth/login/`, {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser({ username });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {user && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        {!user && (
          <Route
            path="/login"
            element={<LoginForm handleSubmitLogin={handleSubmitLogin} />}
          />
        )}
        {user && <Route path="/dashboard" element={<h1>dashboard</h1>} />}
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
      </Routes>
    </>
  );
}

export default App;
