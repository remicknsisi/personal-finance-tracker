import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function NewBudgetForm (){
    // const { currentUser } = useContext(UserContext)

    // console.log(currentUser)

    return (
        <div>
            <h1>Welcome,</h1>
            <p>this is a budget form</p>
        </div>
    )
}

export default NewBudgetForm;