import React, { useState, useEffect } from "react";
// import Title from "@mui/material/Title";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import axios from "axios";

const BoxContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
});

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const users = ["user1", "user1", "user1", "user1", "user1", "user1"];
  // Find user accounts and map over them
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/accounts/")
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const displayCurrentBalance = (currentBalance) => {
    let formattedNumber = "";
    if (currentBalance < 1000) {
      formattedNumber = currentBalance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      });
    } else {
      formattedNumber = currentBalance.toLocaleString("en-US");
    }
    return formattedNumber;
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

// [
//   {
//     "name": "State",
//     "value": [
//       {
//         "id": 1,
//         "account_number": "3198215108718730",
//         "user_id": 1,
//         "current_balance": 5
//       },
//       "{account_number: \"6741028104245837\", current_balanc…}"
//     ],
//     "subHooks": [],
//     "hookSource": {
//       "lineNumber": 43,
//       "functionName": "Accounts",
//       "fileName": "http://localhost:3000/main.ce70ec87361f3d8f73f9.hot-update.js",
//       "columnNumber": 82
//     }
//   },
//   {
//     "name": "Effect",
//     "value": "ƒ () {}",
//     "subHooks": [],
//     "hookSource": {
//       "lineNumber": 46,
//       "functionName": "Accounts",
//       "fileName": "http://localhost:3000/main.ce70ec87361f3d8f73f9.hot-update.js",
//       "columnNumber": 51
//     }
//   }
// ]
