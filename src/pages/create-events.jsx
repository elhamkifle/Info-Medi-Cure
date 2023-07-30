import React from "react";
import { useState } from "react";
import '../styles/createEvents.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CreateEvents() {
    const navigate = useNavigate();
    const [newEvent, setNewEvent] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
    });

    const handleChange = (event) => {
        const {name,value} = event.target;
        setNewEvent({...newEvent, [name]: value});

    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        let isEmpty = false;

        Object.values(newEvent).forEach((value) => {
            if (value.trim() === '') {
                isEmpty = true;
            }
        });

        if (isEmpty) {
            alert('Please fill in all fields.');
            return;
        }

        console.log(newEvent);

        try{
            const eventCreated = await axios.post("http://localhost:3000/events", newEvent);
            if(eventCreated.status == 204){
                alert("Event name already in use. Try using another name.");     
            }
            else if(eventCreated.status == 201){
                alert("Event created");
                navigate('/events')
            }
            else{
                alert("Something went wrong. Please try again.");
            }
            
            }
        catch(err){
            console.log(err);
        }
    }

    function handleCancel(){
        navigate('/events');
    }

    return (
    <div className="createEvents"> 
    <h2> Create a New Event </h2>
    <form>
        <label htmlFor="name">Name:</label><br/>
        <input type="text" id="name" name="name" onChange={handleChange}/><br/>
        <label htmlFor="description">Description:</label><br/>
        <input type="text" id="description" name="description" onChange={handleChange}/><br/>
        <label htmlFor="date">Date: </label><br/>
        <input type="date" id="date" name="date"onChange={handleChange}/><br/>
        <label htmlFor="time">Time:</label><br/>
        <input type="time" id="time" name="time" onChange={handleChange} /><br/><br/>
        <input type="submit" value="Submit" onClick={handleSubmit}/>
        <button className="cancel" onClick={handleCancel}> Cancel </button>
    </form> 

    
    </div>
    )
}

export default CreateEvents;