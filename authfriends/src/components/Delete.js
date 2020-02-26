import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

export default function Delete({ friend, setFriends }) {
    const handleClick = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .delete(`/api/friends/${ friend }`)
            .then(res => setFriends(res.data))
            .catch(err => alert("there was an error deleting friend:", err))
    }
    return (
        <button onClick={ handleClick }>Delete this friend</button>
    )
}
