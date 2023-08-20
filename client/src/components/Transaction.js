import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function Transaction ({ transaction }){
    const { currentUser } = useContext(UserContext)
    const [tags, setTags] = useState([])

    useEffect(() => {
        fetch('/tags')
        .then(res => res.json())
        .then(tagData => setTags(tagData))
    }, [])

    const tagToDisplay = tags.find(tag => tag.id == transaction.tag_id)

    return (
        <div className="transaction">
            <h4>{tagToDisplay ? tagToDisplay.keyword : "Loading transaction..."}: {transaction.description}</h4>
            <p>Date: {transaction.date}</p>
            <p>Paymeny Method: {transaction.payment_method}</p>
        </div>
    )
}

export default Transaction;