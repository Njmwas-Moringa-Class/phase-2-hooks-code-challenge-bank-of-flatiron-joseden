// Transaction.js
import React from "react";

function Transaction({ transaction, onDeleteTransaction }) {
  const handleDelete = () => {
    onDeleteTransaction(transaction.id);
  };

  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
      <td>
        <button className="ui button red" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Transaction;
