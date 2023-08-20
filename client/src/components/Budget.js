import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function Budget ({ budget }){
    const { currentUser } = useContext(UserContext)
    const [tags, setTags] = useState([])

    useEffect(() => {
        fetch('/tags')
        .then(res => res.json())
        .then(tagData => setTags(tagData))
    }, [])

    const navigate = useNavigate()

    const tagToDisplay = tags.find(tag => tag.budget_id == budget.id)

    return (
        <div className="budget">
            {tagToDisplay ? <h3>{tagToDisplay.keyword} Budget</h3> : null}
            <p>Total Allocated Budget: ${budget.amount}</p>
            <button onClick={() => navigate(`/budgets/${budget.id}`)}>See More...</button>
        </div>
    )
}

export default Budget;