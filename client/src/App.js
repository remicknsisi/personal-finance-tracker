import React from "react";
import { UserProvider } from "./context/UserProvider.js";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import NewBudgetForm from "./components/NewBudgetForm.js";
import NewTransactionForm from "./components/NewTransactionForm.js";
import './index.css';
import BudgetDetails from "./components/BudgetDetails.js";
import NewTagForm from "./components/NewTagForm.js";

function App() {
  return (
<div className="App">
  <header className="App-header">
    <h1 className="title">💸Welcome to RailsRiches!💸</h1>
    <h3 className="title">Your Personal Finance Tracker</h3>
  </header>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/budgets/new" element={<NewBudgetForm/>}/>
          <Route path="/transactions/new" element={<NewTransactionForm/>}/>
          <Route path="/tags/new" element={<NewTagForm/>}/>
          <Route path="/budgets/:id" element={<BudgetDetails/>}/>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
