import React, {useContext} from "react";
import { UserProvider } from "./context/UserProvider.js";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import NewBudgetForm from "./components/NewBudgetForm.js";
import NewTransactionForm from "./components/NewTransactionForm.js";
import './App.css';

function App() {
  return (
<div className="App">
      <UserProvider>
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          {/* <Route path="/budgets/:id" element={<BudgetDetails/>}/> */}
          <Route path="/budgets/new" element={<NewBudgetForm/>}/>
          <Route path="/transactions/new" element={<NewTransactionForm/>}/>
        </Routes>
      </header>
      </UserProvider>
    </div>
  );
}

export default App;
