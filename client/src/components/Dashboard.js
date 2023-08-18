import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";
import Budget from './Budget.js';

function Dashboard (){
    const { currentUser } = useContext(UserContext)

    console.log(currentUser)

    return (
        <div>
            <h1>Welcome User!</h1>
            <div className="budget-container">
            {currentUser ? currentUser.budgets.map(b => {
                return <Budget budget={b} key={b.id}/>
            }): null}
            </div>
        </div>
    )
}

export default Dashboard;