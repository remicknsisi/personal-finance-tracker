import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";
import Budget from './Budget.js';
import Sort from './Sort.js';
import Transaction from './Transaction.js';

function Dashboard (){
    const { currentUser } = useContext(UserContext)
    const [isChecked, setIsChecked] = useState(false)

    const navigate = useNavigate()

    console.log(currentUser)

    function handleCheck(){
        setIsChecked(!isChecked)
      }

    const budgetsToDisplay = currentUser ? isChecked ? "these are the budgets in order of date" : currentUser.budgets.map(b => {
        return <Budget budget={b} key={b.id}/>}): null

    const transactionsToDisplay = currentUser ? currentUser.transactions.map(t => {
        return <Transaction transaction={t} key={t.id}/>}): null

    return (
        <div>
            <h1>Welcome User!</h1>
            <div className="budget-container">
                {budgetsToDisplay}
                <button onClick={() => navigate('/budgets/new')}>Add New Budget</button>
            </div>
            <div className="transaction-container">
                <Sort onCheck={handleCheck} isChecked={isChecked}/>
                {transactionsToDisplay}
                <button onClick={() => navigate('/transactions/new')}>Add New Transaction</button>
            </div>
        </div>
    )
}

export default Dashboard;