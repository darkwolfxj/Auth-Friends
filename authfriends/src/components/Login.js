import React, { useState } from "react";
import axiosWithAuth from './../utils/axiosWithAuth';

export default function Login(props) {
    const initState = { username: "", password: "" }
    const [input, setInput] = useState(initState)
    const handleChange = (e) => {
        setInput( { ...input, [e.target.name]: e.target.value  } )
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setInput(initState);
        axiosWithAuth()
            .post("/api/login", input)
            .then(res => {
                window.localStorage.setItem("token", res.data.payload)
                props.history.push("/protected")
            })
            .catch(err => console.log("there was an error:", err))
    }
    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <input onChange={ handleChange } name="username" type="text" value={ input.username } placeholder="username" />
                <input onChange={ handleChange } name="password" type="password" value={ input.password } placeholder="password"/>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}
