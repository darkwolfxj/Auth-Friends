import React, { useEffect, useState } from "react";

import axiosWithAuth from './../utils/axiosWithAuth';
import EditForm from './EditForm';
import Delete from "./Delete";

export default function ProtectedRoute() {
    const [friends, setFriends] = useState([])
    const initFormValue = { name: "", age: "", email: "" }
    const [FormValue, setFormValue] = useState(initFormValue)
    const handleChange = (e) => {
        setFormValue({ ...FormValue, [e.target.name]: e.target.value })
        }
    const handleSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post("/api/friends", FormValue)
            .then(res => {
                console.log(res);
                setFriends(res.data)
            })
            .catch(err => alert("there was an error adding friend:", err));
        setFormValue(initFormValue)
    }
    useEffect(() => {
        axiosWithAuth()
            .get("/api/friends") 
            .then(res => setFriends(res.data))
            .catch(err => alert("there was an error fetching data:", err))
    }, [])
    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <input type="text" placeholder="name" name="name" onChange={ handleChange } value={ FormValue.name } />
                <input type="number" placeholder="age" name="age" onChange={ handleChange } value={ FormValue.age } />
                <input type="email" placeholder="email" name="email" onChange={ handleChange } value={ FormValue.email } />
                <button type="submit">Add Friend</button>
            </form>
            { friends && friends.map(friend => {
                return (
                    <div key={ friend.id }>
                        <span>
                            <p>Name: { friend.name }</p>
                            <p>Age: { friend.age }</p>
                            <p>Email: { friend.email }</p>
                            <EditForm friend={ friend } setFriends={ setFriends }/>
                            <Delete friend={ friend.id } setFriends={ setFriends } />
                        </span>
                        
                    </div>
                )
            }) }
        </div>
    )
}
