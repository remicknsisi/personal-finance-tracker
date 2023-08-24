import React, { useState, useContext } from 'react';
import { UserContext } from "../context/UserProvider.js";

function Tag ({ tag }){
    const { handleDeleteTag } = useContext(UserContext)
    const [error, setError] = useState('')

    function confirmDelete(tag){
        if (window.confirm("Are you sure you want to delete this tag? This action cannot be undone and all transactions/budgets that belong to this tag will also be deleted.")) {
            handleDelete(tag)
        }
    }

    function handleDelete(tag){
        fetch(`/tags/${tag.id}`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"}})
          .then(res => {
            if (res.ok){
                res.json()
                .then(deletedTag => {
                    handleDeleteTag(deletedTag)
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
            <button onClick={() => confirmDelete(tag)}> Delete </button>
            <p className="error-message">{error}</p>
        </div>
    )
}

export default Tag;