import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function NewTransactionForm (){
    const [errorsList, setErrorsList] = useState([])
    const [amount, setAmount] = useState(1)
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const navigate = useNavigate()

    function handleSubmitTransaction(e){
        e.preventDefault()

        fetch(`/transactions`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                amount: amount,
                date: date,
                description: description,
                paymentMethod: paymentMethod
             })
           })
           .then(res => {
            if(res.ok){
                res.json().then((newTransaction) => {
                    console.log(newTransaction, 'set new transaction in state!')
                    navigate('/')})
            } else {
                res.json().then((message) => {
                    const errorLis = message.errors.map(error => <li key={error}>{error}</li>)
                    setErrorsList(errorLis)
                })
            }
        })
    }

    return (
        <div className="form-container">
            <h2>Create Transaction: </h2>
            <form onSubmit={handleSubmitTransaction} className="form">
                <label>Amount: </label>
                <input className="form-input" type="text" onChange={(e) => setAmount(e.target.value)} value={amount} placeholder="Ex: $20" />
                <br></br>
                <label>Description: </label>
                <input className="form-input" type="text" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Ex: Groceries week of 1/14" />
                <br></br>
                <label>Payment Method: </label>
                <input className="form-input" type="text" onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} placeholder="Ex: Cash" />
                <br></br>
                <label>Select a Date: </label>
                <p>put the date picker here!</p>
                <br></br>
                <br></br>
                <br/>
                <button type="submit">Submit Transaction</button>
                <p className="error-message">{errorsList}</p>
            </form>
        </div>
    )
}

export default NewTransactionForm;