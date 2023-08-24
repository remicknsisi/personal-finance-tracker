import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/me")
    .then((res) => {
    if (res.ok) {
      res.json().then((user) => setCurrentUser(user))
    }})
  }, [])

  const login = (user) => {setCurrentUser(user)}
  const logout = () => {setCurrentUser(null)}
  const signup = (newUser) => {setCurrentUser(newUser)}

  function handleNewTransaction(newTransaction){
    const userUpdatedTransactions = [...currentUser.transactions, newTransaction]
    const updatedUser = {...currentUser, transactions: userUpdatedTransactions}
    setCurrentUser(updatedUser)
  }

  function handleDeleteTransaction(deletedTransaction){
    const userUpdatedTransactions = currentUser.transactions.filter(transaction => transaction.id !== deletedTransaction.id)
    const updatedUser = {...currentUser, transactions: userUpdatedTransactions}
    setCurrentUser(updatedUser)
  }

  function handleNewBudget(newBudget){
    const userUpdatedBudgets = [...currentUser.budgets, newBudget]
    const updatedUser = {...currentUser, budgets: userUpdatedBudgets}
    setCurrentUser(updatedUser)
  }

  function handleDeleteBudget(deletedBudget){
    const userUpdatedBudgets = currentUser.budgets.filter(budget => budget.id !== deletedBudget.id)
    const updatedUser = {...currentUser, budgets: userUpdatedBudgets}
    setCurrentUser(updatedUser)
  }

  function handleUpdateBudget(updatedBudget){
    const userUpdatedBudgets = currentUser.budgets.map(budget => budget.id === updatedBudget.id ? updatedBudget : budget)
    const updatedUser = {...currentUser, budgets: userUpdatedBudgets}
    setCurrentUser(updatedUser)
  }

  function handleDeleteAccount(){
    fetch(`/users/${currentUser.id}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}})
      .then(() => {
        navigate(`/login`)
        setCurrentUser(null)
        })
  }

  return (
    <UserContext.Provider value={{currentUser, login, logout, signup, handleNewTransaction, handleDeleteTransaction, handleDeleteBudget, handleUpdateBudget, handleNewBudget, handleDeleteAccount}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }