import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";
import Budget from './Budget.js';
import Sort from './Sort.js';
import Transaction from './Transaction.js';

function Dashboard (){
    const { currentUser, logout } = useContext(UserContext)
    const [isChecked, setIsChecked] = useState(false)
    const [transactions, setTransactions] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch('/transactions')
        .then(res => res.json())
        .then(transactionData => setTransactions(transactionData))
    }, [])

    function handleCheck(){
        setIsChecked(!isChecked)
      }
    function handleLogout(){
        fetch("/logout",{
            method: "DELETE"
        })
        .then(() => {
            logout()
            navigate('/login')
        })
    }

    const budgetsToDisplay = currentUser ? currentUser.budgets.map(b => {
        return <Budget budget={b} key={b.id}/>}): null


    const allTransactions = transactions.map(t => {
        return <Transaction transaction={t} key={t.id}/>})

    const sortedTransactions = [...transactions].sort((t1, t2) => (t1.date > t2.date) ? 1 : (t1.date < t2.date) ? -1 : 0).map(t => {
        return <Transaction transaction={t} key={t.id}/>})

    const transactionsToDisplay = isChecked ? sortedTransactions : allTransactions


    
    return (
        <div className="app">
            {currentUser ? <h1>Welcome {currentUser.name}!</h1> : null}
            {currentUser ? <button onClick={handleLogout}>Logout</button> : <button onClick={() => navigate('/login')}>Login</button>}
            <h2>Budgets</h2>
            <div className="budget-container">
                {budgetsToDisplay}
            </div>
            <button onClick={() => navigate('/budgets/new')}>Add New Budget</button>
            <h2>Transactions</h2>
            <Sort onCheck={handleCheck} isChecked={isChecked}/>
            <div className="transaction-container">
                {transactionsToDisplay}
            </div>
            <button onClick={() => navigate('/transactions/new')}>Add New Transaction</button>
        </div>
    )
}

export default Dashboard;