import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";
import Budget from './Budget.js';
import Sort from './Sort.js';
import Transaction from './Transaction.js';
import Tag from './Tag.js';

function Dashboard (){
    const { currentUser, logout, handleDeleteAccount, tags} = useContext(UserContext)
    const [isChecked, setIsChecked] = useState(false)
    const [transactions, setTransactions] = useState([])

    const navigate = useNavigate()

    function confirmDelete(){
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            handleDeleteAccount()
        }
    }

    useEffect(() => {
        fetch('/transactions')
        .then(res => res.json())
        .then(transactionData => setTransactions(transactionData))
    }, [currentUser])

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
        
    const tagsToDisplay = tags.map(t => {
        return <Tag tag={t} key={t.id}/>})

    const allTransactions = transactions.map(t => {
        return <Transaction transaction={t} key={t.id}/>})

    const sortedTransactions = [...transactions].sort((t1, t2) => (t1.date > t2.date) ? 1 : (t1.date < t2.date) ? -1 : 0).map(t => {
        return <Transaction transaction={t} key={t.id}/>})

    const transactionsToDisplay = isChecked ? sortedTransactions : allTransactions
    
    return (
        <div className="app">
            {currentUser ? <h1 className="title">Welcome to RailsRiches, {currentUser.name}!</h1> : null}
            {currentUser ? <button onClick={handleLogout}>Logout</button> : <button onClick={() => navigate('/login')}>Login</button>}
            <button onClick={() => confirmDelete()}>Delete Account</button>
            <h2>All Budgets</h2>
            <div className="budget-container">
                {budgetsToDisplay}
            </div>
            <button onClick={() => navigate('/budgets/new')}>Add New Budget</button>
            <h2>All Transactions</h2>
            <Sort onCheck={handleCheck} isChecked={isChecked}/>
            <div className="transaction-container">
                {transactionsToDisplay}
            </div>
            <button onClick={() => navigate('/transactions/new')}>Add New Transaction</button>
            <h2>All Tags</h2>
            <div className="tags-container">
                {tagsToDisplay}
            </div>
            <button onClick={() => navigate('/tags/new')}>Add New Tag</button>
        </div>
    )
}

export default Dashboard;