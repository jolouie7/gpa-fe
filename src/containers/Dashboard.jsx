import React from "react";
import { Routes, Route } from "react-router-dom";
import Accounts from "../components/Accounts";
import Transactions from "../components/Transactions";
import Sidebar from "../components/Sidebar";
import { styled } from "@mui/system";

const DashboardContainer = styled("div")({
  display: "flex",
  justifyContent: "start",
});

const Dashboard = () => {
  return (
    <div>
      <DashboardContainer>
        {/* The Sidebar will be displayed all the time */}
        <Sidebar />
        <Routes>
          {/* Route for the Transactions page */}
          <Route path="" element={<Accounts />} />
          {/* Route for the Transactions page */}
          <Route path="/transactions" element={<Transactions />} />
          {/* Nested Route for the Accounts page */}
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
      </DashboardContainer>
    </div>
  );
};

export default Dashboard;
