import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function NewBudgetForm (){
    const [errorsList, setErrorsList] = useState([])
    const [amount, setAmount] = useState(1)
    const [tagId, setTagId] = useState(1)
    const { handleNewBudget, currentUser } = useContext(UserContext)
    const navigate = useNavigate()

    function handleSubmitBudget(e){
        e.preventDefault()

        fetch(`/budgets`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                amount: amount,
                tag_id: tagId
             })
           })
           .then(res => {
            if(res.ok){
                res.json().then((newBudget) => {
                    handleNewBudget(newBudget)
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
            <h2>Create Budget: </h2>
            <form onSubmit={handleSubmitBudget} className="form">
                <label>Amount: </label>
                <input className="form-input" type="text" onChange={(e) => setAmount(e.target.value)} value={amount} placeholder="Ex: $100" />
                <br></br>
                <label>Select a Tag: </label>
                <select value={tagId} className="form-input" onChange={e => setTagId(e.target.value)}>
                    {uniqueTags.map(tag => <option value={tag.id}>{tag.keyword}</option>)}
                </select>
                <br></br>
                <p>Don't see the tag you want for your budget? Create a new one <Link to={'/tags/new'}>here.</Link></p>
                <button type="submit">Create Budget</button>
                <p className="error-message">{errorsList}</p>
                <button onClick={() => navigate('/')}>Back to Dashboard</button>
            </form>
        </div>
    )
}

export default NewBudgetForm;