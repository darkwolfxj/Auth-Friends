import React, { useState } from "react";

import axiosWithAuth from './../utils/axiosWithAuth';

export default function EditForm({ friend, setFriends }) {
    const [editing, setEditing] = useState(false)
    const [editValue, setEditValue] = useState({ name: friend.name, age: friend.age, email: friend.email })
    console.log("editValue in edit form:", editValue)
    const handleChange = (e) => setEditValue({ ...editValue, [e.target.name]: e.target.value })
    const handleSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .put(`/api/friends/${ friend.id }`, editValue)
            .then(res => setFriends(res.data))
        setEditing(false);
    }
    return (
        (editing) ? (
            (<div>
                <p>Fill in all fields before confirming</p>
                <form onSubmit={ handleSubmit }>
                <input onChange={ handleChange } value={ editValue.name } type="text" placeholder="new name" name="name" />
                <input onChange={ handleChange } value={ editValue.age } type="number" placeholder="new age" name="age"/>
                <input onChange={ handleChange } value={ editValue.email } type="email" placeholder="new email" name="email"/>
                <button type="submit">Confirm</button>                
                </form>
            </div>)
        ) : (<button onClick={ () => setEditing(!editing) }>Edit</button>)
        
    )
}
