import React from "react";
import Accounts from "../components/Accounts";
import Sidebar from "../components/Sidebar";
import { styled } from "@mui/system";

const DashboardContainer = styled("div")({
  display: "flex",
  justifyContent: "start",
});

const Dashboard = () => {
  return (
    <>
      <DashboardContainer>
        <Sidebar />
        <Accounts />
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
