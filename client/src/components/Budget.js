import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function Budget ({ budget }){
    const { currentUser } = useContext(UserContext)
    console.log(budget)

    return (
        <div>
            Allocated Budget: ${budget.amount}
        </div>
    )
}

export default Budget;