import React from "react";
// import Title from "@mui/material/Title";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const Accounts = () => {
  const users = ["user1", "user1", "user1", "user1", "user1", "user1"];
  // Find user accounts and map over them
  function preventDefault(event) {
    event.preventDefault();
  }
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {users.map((_, index) => (
          <Box
            sx={{
              border: 1,
              padding: "1rem",
              height: "150px",
              width: 300,
              margin: "0 auto",
            }}
          >
            <Typography sx={{ fontSize: "2rem" }}>Recent Deposits</Typography>
            <Typography>0000 0000 0000 0000</Typography>
            <Typography sx={{ flex: 1, marginTop: "1rem" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>Current Balance:</div> <div>$3,024.00</div>
              </Box>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link color="primary" href="#" onClick={preventDefault}>
                View Transactions
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Accounts;
