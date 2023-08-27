import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider.js";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const { login } = useContext(UserContext)
  
    function handleSubmit(e) {
      e.preventDefault()
      const user = {
        email,
        password
      }

      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then(res => {
            if(res.ok){
                res.json().then((user) => {
                    login(user)
                    setEmail('')
                    setPassword('')
                    setError('')
                    navigate('/')})
            } else {
                res.json().then((user) => setError(user.error.login))
            }
        })
    }
  
    return (
    <div className='login-container'>
    <h1 className="login-header">Log In Below</h1>
      <form onSubmit={handleSubmit} className="form">
        Email: 
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='login-input'
        />
        <br/>
        Password: 
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='login-input'
        />
        <br/><br/>
        <button type="submit">Login</button>
        {Boolean(error) ? <p className="error-message">**{error}**</p> : null}
        <p className='signup-prompt'>Don't have an account? <Link to={`/signup`}>Sign up</Link></p>
      </form>
    </div>
    );
  }

export default Login;