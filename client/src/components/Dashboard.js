import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";
import Budget from './Budget.js';
import Sort from './Sort.js';
import Transaction from './Transaction.js';
import Tag from './Tag.js';

function Dashboard (){
    const { currentUser, logout, handleDeleteAccount } = useContext(UserContext)
    const [isChecked, setIsChecked] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [budgets, setBudgets] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/transactions')
        .then(res => res.json())
        .then(transactionData => setTransactions(transactionData))
    }, [currentUser])

    useEffect(() => {
        fetch('/budgets')
        .then(res => res.json())
        .then(budgetData => setBudgets(budgetData))
    }, [currentUser])

    function confirmDelete(){
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            handleDeleteAccount()
        }
    }
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

    const budgetsToDisplay = [...budgets].map(b => {
        return <Budget budget={b} key={b.id}/>})
    const uniqueTags = currentUser ? Array.from(new Set(currentUser.tags.map(JSON.stringify))).map(JSON.parse): null
    const tagsToDisplay = uniqueTags ? uniqueTags.map(t => {
        return <Tag tag={t} key={t.id}/>}): null
    const allTransactions = [...transactions].map(t => {
        return <Transaction transaction={t} key={t.id}/>})
    const sortedTransactions = [...transactions].sort((t1, t2) => (t1.date > t2.date) ? 1 : (t1.date < t2.date) ? -1 : 0).map(t => {
        return <Transaction transaction={t} key={t.id}/>})
    const transactionsToDisplay = isChecked ? sortedTransactions : allTransactions
    
    return (
        <div className="app">
            {currentUser ? <button onClick={handleLogout}>Logout</button> : <button onClick={() => navigate('/login')}>Login</button>}
            <button onClick={() => confirmDelete()}>Delete Account</button>
            <h2>All Budgets 🏦</h2>
            <div className="budget-container">
                {budgetsToDisplay ? budgetsToDisplay.length > 0 ? budgetsToDisplay : "You currently have no budgets created!" : null}
            </div>
            <button onClick={() => navigate('/budgets/new')}>Add New Budget</button>
            <h2>All Transactions 💵</h2>
            <Sort onCheck={handleCheck} isChecked={isChecked}/>
            <div className="transaction-container">
                {transactionsToDisplay ? transactionsToDisplay.length > 0 ? transactionsToDisplay : "You currently have no transactions logged!" : null}
            </div>
            <button onClick={() => navigate('/transactions/new')}>Add New Transaction</button>
            <h2>All Tags 💲</h2>
            <div className="tags-container">
                {tagsToDisplay ? tagsToDisplay.length > 0 ? tagsToDisplay : "You currently have no tags created!": null}
            </div>
            <button onClick={() => navigate('/tags/new')}>Add New Tag</button>
        </div>
    )
}

export default Dashboard;