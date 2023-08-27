import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider.js";

function NewTagForm(){
    const [errorsList, setErrorsList] = useState([])
    const [keyword, setKeyword] = useState('')
    const { handleCreateTag } = useContext(UserContext)
    const navigate = useNavigate()

    function handleSubmitTag(e){
        e.preventDefault()

        fetch(`/tags`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                keyword: keyword
             })
           })
           .then(res => {
            if(res.ok){
                res.json().then((newTag) => {
                    handleCreateTag(newTag)
                    navigate('/')})
            } else {
                res.json().then((message) => {
                    console.log(message)
                    const errorLis = message.errors.map(error => <li key={error}>{error}</li>)
                    setErrorsList(errorLis)
                })
            }
        })
    }

    return (
        <div className="form-container">
            <h2>Add New Tag: </h2>
            <form onSubmit={handleSubmitTag} className="form">
                <label>Keyword: </label>
                <input className="form-input" type="text" onChange={(e) => setKeyword(e.target.value)} value={keyword} placeholder="Ex: Groceries" />
                <br></br>
                <button type="submit">Create Tag</button>
                <p className="error-message">{errorsList}</p>
                <button onClick={() => navigate('/')}>Back to Dashboard</button>
            </form>
        </div>
    )
}

export default NewTagForm;