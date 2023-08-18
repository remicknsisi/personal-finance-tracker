import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function Transaction ({ transaction }){
    const { currentUser } = useContext(UserContext)
    console.log(transaction)

    return (
        <div className="transaction">
            <h3>Tag: </h3>
            <p>Date: </p>
            <p>Description: </p>
            <p>Paymeny Method: </p>
        </div>
    )
}

export default Transaction;