import React from "react";
// import Title from "@mui/material/Title";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Accounts = () => {
  function preventDefault(event) {
    event.preventDefault();
  }
  return (
    <>
      <Typography>Recent Deposits</Typography>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </>
  );
};

export default Accounts;
