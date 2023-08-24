import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function Tag ({ tag, onDelete }){
    const { currentUser } = useContext(UserContext)
    const [error, setError] = useState('')

    function handleDelete(tag){
        fetch(`/tags/${tag.id}`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"}})
          .then(res => {
            if (res.ok){
                res.json()
                .then(deletedTag => {
                    onDelete(deletedTag)
                })
            } else {
                res.json()
                .then(message => {
                    const errorMessage = message.error
                    setError(errorMessage)
                })
        }})
    }

    return (
        <div className="tag">
            {tag.keyword}
            <button onClick={() => handleDelete(tag)}> Delete </button>
            <p className="error-message">{error}</p>
        </div>
    )
}

export default Tag;