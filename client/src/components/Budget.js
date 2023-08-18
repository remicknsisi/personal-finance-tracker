import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function Budget ({ budget }){
    const { currentUser } = useContext(UserContext)
    console.log(budget)

    return (
        <div className="budget">
            <h3>Category: </h3>
            <p>Total Allocated Budget: ${budget.amount}</p>
            <p>Amount Remaining: </p>
            <p>Tag: </p>
        </div>
    )
}

export default Budget;