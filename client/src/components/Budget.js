import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function Budget ({ budget }){
    const { currentUser, handleDeleteBudget } = useContext(UserContext)
    const [error, setError] = useState('')
    const [tags, setTags] = useState([])

    useEffect(() => {
        fetch('/tags')
        .then(res => res.json())
        .then(tagData => setTags(tagData))
    }, [])

    function handleDelete(budget){
        fetch(`/budgets/${budget.id}`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"}})
          .then(res => {
            if (res.ok){
                res.json()
                .then(deletedBudget => {
                    handleDeleteBudget(deletedBudget)
                })
            } else {
                res.json()
                .then(message => {
                    const errorMessage = message.error
                    setError(errorMessage)
                })
        }})
    }

    const navigate = useNavigate()

    const tagToDisplay = tags.find(tag => tag.id == budget.tag_id)

    return (
        <div className="budget">
            {tagToDisplay ? <h3>{tagToDisplay.keyword} Budget</h3> : null}
            <p>Total Allocated Budget: ${budget.amount}</p>
            <button onClick={() => navigate(`/budgets/${budget.id}`)}>See More...</button>
            <button onClick={() => handleDelete(budget)}> Delete </button>
            <p className="error-message">{error}</p>
        </div>
    )
}

export default Budget;