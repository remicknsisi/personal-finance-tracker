import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function Budget ({ budget }){
    const { currentUser } = useContext(UserContext)
    console.log(budget)

    const navigate = useNavigate()

    return (
        <div className="budget">
            <h3>Budget tagname </h3>
            <p>Total Allocated Budget: ${budget.amount}</p>
            <p>Amount Remaining: </p>
            <button onClick={() => navigate(`/budgets/${budget.id}`)}>See More...</button>
        </div>
    )
}

export default Budget;