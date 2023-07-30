import React from "react";
import { useState } from 'react';
import { useGetUser } from "../hooks/useGetUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfile(){
    const user = useGetUser();
    const navigate = useNavigate();
    const [editedUser, setEditedUser] = useState({
        name: user.name,
        password: user.password
    });

    const handleChange = (event) => {
        const {name,value} = event.target;
        setEditedUser({...editedUser, [name]: value});
    };

    const handleCancel = (event) => {
        navigate('/profile');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let isEmpty = false;

        Object.values(editedUser).forEach((value) => {
            if (value.trim() === '') {
                isEmpty = true;
            }
        });

        if (isEmpty) {
            navigate('/profile');
            return;
        }

        console.log(editedUser);

        try{
            const userEdited = await axios.patch(`http://localhost:3000/${user._id}`, editedUser);
            if(userEdited.status === 203){
                alert("Your information is not found. Please try again.");
            }
            else if(userEdited.status === 204){
                alert("User edited.");
                navigate('/profile');
            }
            else{
                alert("Something went wrong. Please try again.")
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <div className="createEvents"> 
                <h2> Edit Your Profile </h2>
                <form>
                    <label htmlFor="name">Name</label><br/>
                    <input type="text" id="name" name="name" onChange={handleChange} value={editedUser.name}/><br/>
                    <label htmlFor="password"> Password </label>
                    <input type="password" id="password" name="password" onChange={handleChange}/>
                    <input type="submit" value="Submit" onClick={handleSubmit}/>
                    <button className="cancel" onClick={handleCancel}> Cancel </button>
                </form> 
            </div>

            
        </>
    )
}

export default EditProfile;