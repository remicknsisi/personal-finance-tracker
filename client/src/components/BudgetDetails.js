import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";
import Transaction from './Transaction.js';

function BudgetDetails (){
    const [budgets, setBudgets] = useState([])
    const [tags, setTags] = useState([])
    const [transactions, setTransactions] = useState([])
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
    }, [])

    const budgetToDisplay = budgets.find(b => b.id == id)
    const tagToDisplay = tags.find(tag => tag.budget_id == id)
    const transactionsToDisplay = transactions.filter(t => t.tag_id == tagToDisplay.id)

    return (
        <div className="budget-details">
            <div className="budget">
                <h3>Budget tagname </h3>
                <p>Total Allocated Budget: ${(budgetToDisplay.amount).toFixed(2)}</p>
                <p>Amount Remaining: </p>
                <button onClick={() => navigate('/')}>Back to Dashboard</button>
            </div>
            <div className="transaction">
                {transactionsToDisplay.map(t => {
                    return <Transaction transaction={t} key={t.id}/>})}
            </div>
        </div>
    )
}

export default BudgetDetails;