import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function NewBudgetForm (){
    const [errorsList, setErrorsList] = useState([])
    const [amount, setAmount] = useState(1)
    const [tag, setTag] = useState('')
    const navigate = useNavigate()

    function handleSubmitBudget(e){
        e.preventDefault()

        fetch(`/budgets`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                amount: amount
             })
           })
           .then(res => {
            if(res.ok){
                res.json().then((newBudget) => {
                    console.log(newBudget, 'set new budget in state!')
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
            <h2>Create Budget: </h2>
            <form onSubmit={handleSubmitBudget} className="form">
                <label>Amount: </label>
                <input className="form-input" type="text" onChange={(e) => setAmount(e.target.value)} value={amount} placeholder="Ex: $100" />
                <br></br>
                {/* <label>Select a Tag: </label>
                <select value={tag} className="form-input" onChange={e => setTag(e.target.value)}>
                    <option value="Hufflepuff">Render an option for each existing tag or option to create a new one</option>
                    <option value="Gryffindor">Gryffindor</option>
                    <option value="Slytherin">Slytherin</option>
                    <option value="Ravenclaw">Ravenclaw</option>
                    <option value="Hufflepuff">Hufflepuff</option>
                </select> */}
                <br></br>
                <br></br>
                <br/>
                <button type="submit">Create Budget</button>
                <p className="error-message">{errorsList}</p>
            </form>
        </div>
    )
}

export default NewBudgetForm;