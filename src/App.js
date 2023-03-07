import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./containers/Dashboard";
import Accounts from "./components/Accounts";
import Transactions from "./components/Transactions";
import { apiURL } from "./constants/constant";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in on component mount
    const token = localStorage.getItem("token");
    const localStorageUser = localStorage.getItem("user");
    if (!token && !localStorageUser) {
      // logout user
      console.log("logout");
      handleLogout();
    }
    setUser({ username: localStorageUser });
  }, []);

  // Handle logout
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  }

  // Handle form submission
  async function handleSubmitLogin(event, username, password) {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/api/auth/login/`, {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      const userObj = JSON.stringify({
        username: username,
        id: response.data.user_id,
      });
      localStorage.setItem("user", userObj);
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
            <div>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </div>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route
          path="/login"
          element={<LoginForm handleSubmitLogin={handleSubmitLogin} />}
        />
        {user && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="accounts" element={<Accounts />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
        )}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
