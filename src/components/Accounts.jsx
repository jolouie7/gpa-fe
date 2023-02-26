import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import axios from "axios";
import { displayCurrentBalance } from "../util/util";
import { apiURL } from "../constants/constant";

const BoxContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
});

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/accounts/${user.id}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        console.log("res: ", response.data);
        setAccounts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAccounts();
  }, []);

  const preventDefault = (event) => {
    event.preventDefault();
  };

  const displayAccountNumber = (accountNumber) => {
    return (
      accountNumber.slice(0, 4) +
      " " +
      accountNumber.slice(4, 8) +
      " " +
      accountNumber.slice(8, 12) +
      " " +
      accountNumber.slice(12, 16)
    );
  };

  return (
    <>
      <BoxContainer>
        {accounts.map((account) => (
          <Box
            key={account.id}
            sx={{
              border: 1,
              padding: "1rem",
              height: "150px",
              width: 300,
              margin: "0 auto",
            }}
          >
            <Typography sx={{ fontSize: "2rem" }}>Recent Deposits</Typography>
            <Typography>
              {displayAccountNumber(account.account_number)}
            </Typography>
            <Typography component={Box} sx={{ flex: 1, marginTop: "1rem" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>Current Balance:</div>{" "}
                <div>${displayCurrentBalance(account.current_balance)}</div>
              </Box>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Link color="primary" href="#" onClick={preventDefault}>
                View Transactions
              </Link>
            </Box>
          </Box>
        ))}
      </BoxContainer>
    </>
  );
};

export default Accounts;
