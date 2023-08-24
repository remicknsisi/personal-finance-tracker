import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";
import Transaction from './Transaction.js';
import EditBudgetForm from './EditBudgetForm.js';

function BudgetDetails (){
    const [budgets, setBudgets] = useState([])
    const [tags, setTags] = useState([])
    const [transactions, setTransactions] = useState([])
    const [isHidden, setIsHidden] = useState(true)
    const { currentUser } = useContext(UserContext)
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        fetch('/tags')
        .then(res => res.json())
        .then(tagData => setTags(tagData))
    }, [])

    useEffect(() => {
        fetch('/budgets')
        .then(res => res.json())
        .then(budgetData => setBudgets(budgetData))
    }, [])

    useEffect(() => {
        fetch('/transactions')
        .then(res => res.json())
        .then(transactionData => setTransactions(transactionData))
    }, [currentUser])

    const budgetToDisplay = budgets.find(b => b.id == id)
    const tagToDisplay = budgetToDisplay ? tags.find(tag => tag.id == budgetToDisplay.tag_id) : null
    const transactionsToDisplay = tagToDisplay ? transactions.filter(t => t.tag_id == tagToDisplay.id) : null
    const budget_remaining = budgetToDisplay && transactionsToDisplay ? (budgetToDisplay.amount - transactionsToDisplay.map(t => t.amount).reduce((a, b) => {
        return a + b;
    }, 0)) : null

    return (
        <div className="budget-details">
            <div className="budget">
                <h3>{tagToDisplay ? tagToDisplay.keyword: "Loading..."} Budget</h3>
                <p>Total Allocated Budget: ${budgetToDisplay ? (budgetToDisplay.amount).toFixed(2) : "Loading..."}</p>
                { budget_remaining > 0 ? <p className="under-budget">Amount Remaining: ${budget_remaining ? budget_remaining.toFixed(2) : "Loading..."}</p> : <p className="over-budget">Amount Remaining: ${budget_remaining ? budget_remaining.toFixed(2) : "Loading..."}</p>}
                <button onClick={() => navigate('/')}>Back to Dashboard</button>
                <button onClick={() => setIsHidden(!isHidden)}>Edit Budget</button>
                {isHidden ? null : <EditBudgetForm/>}
            </div>
            <div className="transaction">
                {transactionsToDisplay ? transactionsToDisplay.map(t => {
                    return <Transaction transaction={t} key={t.id}/>}) : "Loading..."}
            </div>
        </div>
    )
}

export default BudgetDetails;