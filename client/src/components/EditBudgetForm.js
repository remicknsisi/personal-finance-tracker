import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function EditBudgetForm() {
    const [errorsList, setErrorsList] = useState([])
    const [amount, setAmount] = useState()
    const [tagId, setTagId] = useState()
    const [tags, setTags] = useState([])
    const { currentUser, handleUpdateBudget } = useContext(UserContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const budgetOfFocus = currentUser.budgets.find(b => b.id == id)

    useEffect(() => {
        if (budgetOfFocus){
        setAmount(budgetOfFocus.amount)
        setTagId(budgetOfFocus.id)
    }
    }, [currentUser])

    useEffect(() => {
        fetch('/tags')
        .then(res => res.json())
        .then(tagData => setTags(tagData))
    }, [])

    function handleSubmit(e){
        e.preventDefault()

        fetch(`/budgets/${id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                amount: amount,
                tag_id: tagId
             })
           })
           .then(res => {
            if(res.ok){
                res.json().then((updatedBudget) => {
                    handleUpdateBudget(updatedBudget)
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
    <div className="form">
            <h2>Edit Budget: </h2>
            <form onSubmit={handleSubmit} className="form">
                <label>Amount: </label>
                $<input className="form-input" type="text" onChange={(e) => setAmount(e.target.value)} value={amount}/>
                <br></br>
                <label>Select a Tag: </label>
                <select value={tagId} className="form-input" onChange={e => setTagId(e.target.value)}>
                    {tags.map(tag => <option value={tag.id}>{tag.keyword}</option>)}
                </select>
                <br></br>
                <br></br>
                <br/>
                <button type="submit">Finish Editing Budget</button>
                <p className="error-message">{errorsList}</p>
            </form>
    </div>
  );
}

export default EditBudgetForm;

// do i want to let the user be able to edit the tag here?