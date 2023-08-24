import React, { useState, useContext } from 'react';
import { UserContext } from "../context/UserProvider.js";

function Transaction ({ transaction }){
    const { currentUser, handleDeleteTransaction, tags } = useContext(UserContext)
    const [error, setError] = useState('')

    const tagToDisplay = tags.find(tag => tag.id == transaction.tag_id)

    function handleDelete(transaction){
        fetch(`/transactions/${transaction.id}`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"}})
          .then(res => {
            if (res.ok){
                res.json()
                .then(deletedTransaction => {
                    handleDeleteTransaction(deletedTransaction)
                })
            } else {
                res.json()
                .then(message => {
                    const errorMessage = message.error
                    setError(errorMessage)
                })
        }})
    }

    return (
        <div className="transaction">
            <h4>{tagToDisplay ? tagToDisplay.keyword : "Loading transaction tag..."}</h4>
            <p>Description: {transaction.description}</p>
            <p>Date: {transaction.date}</p>
            <p>Amount: ${(transaction.amount).toFixed(2)}</p>
            <p>Payment Method: {transaction.payment_method}</p>
            <button onClick={() => handleDelete(transaction)}> Delete </button>
            <p className="error-message">{error}</p>
        </div>
    )
}

export default Transaction;