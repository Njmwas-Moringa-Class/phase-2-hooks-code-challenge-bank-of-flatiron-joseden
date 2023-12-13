
// AccountContainer.js
import React, { useState, useEffect } from "react";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import TransactionsList from "./TransactionsList";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const handleSearch = (term) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleAddTransaction = (newTransaction) => {
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions([...transactions, data]);
        handleSearch('');
      })
      .catch((error) => console.error("Error adding transaction:", error));
  };

  const handleDeleteTransaction = (id) => {
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== id
        );
        setTransactions(updatedTransactions);
        setFilteredTransactions(updatedTransactions);
      })
      .catch((error) =>
        console.error(`Error deleting transaction with ID ${id}:`, error)
      );
  };

  const handleSort = (field) => {
    // Sort transactions by the selected field
    const sorted = [...filteredTransactions].sort((a, b) => {
      return a[field].localeCompare(b[field]);
    });

    setFilteredTransactions(sorted);
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <AddTransactionForm handleAddTransaction={handleAddTransaction} />
      <TransactionsList
        transactions={filteredTransactions}
        onDeleteTransaction={handleDeleteTransaction}
        onSort={handleSort}
      />
    </div>
  );
}

export default AccountContainer;

