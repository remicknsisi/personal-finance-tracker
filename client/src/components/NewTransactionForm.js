import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

function NewTransactionForm (){
    const [errorsList, setErrorsList] = useState([])
    const [amount, setAmount] = useState()
    const [date, setDate] = useState('')
    const [tagId, setTagId] = useState()
    const [description, setDescription] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const navigate = useNavigate()

    const { handleNewTransaction, currentUser } = useContext(UserContext)

    function handleSubmitTransaction(e){
        e.preventDefault()

        fetch(`/transactions`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                amount: amount,
                date: date,
                description: description,
                payment_method: paymentMethod,
                tag_id: tagId
             })
           })
           .then(res => {
            if(res.ok){
                res.json().then((newTransaction) => {
                    handleNewTransaction(newTransaction)
                    navigate('/')})
            } else {
                res.json().then((message) => {
                    const errorLis = message.errors.map(error => <li key={error}>{error}</li>)
                    setErrorsList(errorLis)
                })
            }
        })
    }

    const uniqueTags = currentUser ? Array.from(new Set(currentUser.tags.map(JSON.stringify))).map(JSON.parse): null

    return (
        <div className="form-container">
            <h2>Log New Transaction: </h2>
            <form onSubmit={handleSubmitTransaction} className="form">
                <label>Amount: </label>
                <input className="form-input" type="text" onChange={(e) => setAmount(e.target.value)} value={amount} placeholder="Ex: 20" />
                <br></br>
                <label>Tag: </label>
                <select className='form-input' type="number" onChange={e => setTagId(e.target.value)}>
                    <option>Select a Tag</option>
                    {uniqueTags.map(tag => <option value={tag.id}>{tag.keyword}</option>)}
                </select>
                <br></br>
                <label>Description: </label>
                <input className="form-input" type="text" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Ex: Groceries week of 1/14" />
                <br></br>
                <label>Payment Method: </label>
                <input className="form-input" type="text" onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} placeholder="Ex: Cash" />
                <br></br>
                <label>Select a Date: </label>
                <DatePicker selected={date} onChange={(d) => setDate(d)} />                
                <br></br>
                <br></br>
                <button type="submit">Submit Transaction</button>
                <p>Don't see the tag you want for your budget? Create a new one <Link to={'/tags/new'}>here.</Link></p>
                <p className="error-message">{errorsList}</p>
                <button onClick={() => navigate('/')}>Back to Dashboard</button>
            </form>
        </div>
    )
}

export default NewTransactionForm;