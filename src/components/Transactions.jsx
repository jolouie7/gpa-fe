import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { format } from "date-fns";
import { displayCurrentBalance } from "../util/util";

// When auth is working. Getting the account number, we can get all the accounts associated with the user
// There aren't a lot of accounts a user can have so we can just get all of them

const columns = [
  { id: "id", label: "Id", minWidth: 20, align: "left" },
  { id: "date", label: "Date", minWidth: 50, align: "left" },
  {
    id: "transaction_type",
    label: "Transaction Type",
    minWidth: 150,
    align: "left",
    format: 13213,
  },
  {
    id: "account_number",
    label: "Account Number",
    minWidth: 150,
    align: "left",
    format: 13213,
  },
  {
    id: "note",
    label: "Note",
    minWidth: 170,
    align: "left",
    format: 13213,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "left",
    format: 13213,
  },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = () => {
    axios
      .get("http://localhost:8000/api/accounts/")
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTransactions = () => {
    axios
      .get("http://localhost:8000/api/transactions/")
      .then((response) => {
        setTransactions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAccounts();
    fetchTransactions();
  }, []);

  const displayTransactions = () => {
    return transactions.map((transaction) => {
      let accountNum = null;
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id === transaction.account_id) {
          accountNum = accounts[i].account_number;
        }
      }
      const dateString = transaction.date_updated;
      const date = new Date(dateString);
      const formattedDate = format(date, "MMMM d, yyyy");

      return (
        <TableRow hover key={transaction.id}>
          <TableCell>{transaction.id}</TableCell>
          <TableCell>{formattedDate}</TableCell>
          <TableCell>{transaction.transaction_type}</TableCell>
          <TableCell>{accountNum}</TableCell>
          <TableCell>{transaction.note}</TableCell>
          <TableCell>
            {transaction.transaction_type === "CREDIT" ? "+" : "-"}
            {displayCurrentBalance(transaction.amount)}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{displayTransactions()}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Transactions;
