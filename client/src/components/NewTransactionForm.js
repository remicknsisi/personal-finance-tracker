import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function NewTransactionForm (){
    // const { currentUser } = useContext(UserContext)

    // console.log(currentUser)

    return (
        <div>
            <h1>Welcome,</h1>
            <p>this is a transaction form</p>
        </div>
    )
}

export default NewTransactionForm;