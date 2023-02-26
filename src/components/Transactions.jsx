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
import { apiURL } from "../constants/constant";

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
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAccounts = () => {
    axios
      .get(`${apiURL}/api/accounts/${user.id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTransactions = () => {
    axios
      .get(`${apiURL}/api/transactions/${user.id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
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
          <TableCell>****{accountNum.slice(12, 16)}</TableCell>
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
      <TableContainer>
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
