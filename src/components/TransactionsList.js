// TransactionsList.js
import React, { useState } from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions, onDeleteTransaction, onSort }) {
  const [sortField, setSortField] = useState("");

  const handleSort = (field) => {
    setSortField(field);
    onSort(field);
  };

  return (
    <table className="ui celled striped padded table">
      <thead>
        <tr>
          <th onClick={() => handleSort("date")}>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th onClick={() => handleSort("description")}>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th onClick={() => handleSort("category")}>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th onClick={() => handleSort("amount")}>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Actions</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions
          .sort((a, b) => {
            if (sortField) {
              return a[sortField].localeCompare(b[sortField]);
            }
            return 0;
          })
          .map((transaction) => (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              onDeleteTransaction={onDeleteTransaction}
            />
          ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;
