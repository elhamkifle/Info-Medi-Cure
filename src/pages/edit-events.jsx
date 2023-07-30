import React from "react";
import { useState } from "react";
import '../styles/createEvents.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function EditEvents(){
    const eventToEdit = JSON.parse(window.localStorage.getItem('selectedEvent'));
    const isoDate = new Date(eventToEdit.date).toISOString();
    const formattedDate = isoDate.slice(0, 10);

    const navigate = useNavigate();
    const [editedEvent, setEditedEvent] = useState({
        name: eventToEdit.name,
        description: eventToEdit.description,
        date: formattedDate,
        time: eventToEdit.time,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        let isEmpty = false;

        Object.values(editedEvent).forEach((value) => {
            if (value.trim() === '') {
                isEmpty = true;
            }
        });

        if (isEmpty) {
            alert('Please fill in all fields.');
            return;
        }

        console.log(editedEvent);

        try {
            const eventEdited = await axios.put(`http://localhost:3000/events/${eventToEdit._id}`, editedEvent);
            if (eventEdited.status === 404) {
                alert("Event not found. Try refreshing the page.");
            } else if (eventEdited.status === 201) {
                alert("Event updated");
                navigate('/events');
            } else {
                alert("Something went wrong. Please try again.");
                console.log(eventEdited.status);
            }
        } catch (err) {
            console.log(err);
        }
        
    };

    const handleChange = (event) => {
        const {name,value} = event.target;
        setEditedEvent({...editedEvent, [name]: value});
    };
    
    const handleCancel = (event) => {
        navigate('/events');
    }
    return(
        <>
            <div className="createEvents"> 
                <h2> Edit Event </h2>
                <form>
                    <label htmlFor="name">Name</label><br/>
                    <input type="text" id="name" name="name" onChange={handleChange} value={editedEvent.name}/><br/>
                    <label htmlFor="description">Description:</label><br/>
                    <input type="text" id="description" name="description" onChange={handleChange} value={editedEvent.description}/><br/>
                    <label htmlFor="date">Date: </label><br/>
                    <input type="date" id="date" name="date"onChange={handleChange} value={editedEvent.date}/><br/>
                    <label htmlFor="time">Time:</label><br/>
                    <input type="time" id="time" name="time" onChange={handleChange} value={editedEvent.time}/><br/><br/>
                    <input type="submit" value="Submit" onClick={handleSubmit}/>
                    <button className="cancel" onClick={handleCancel}> Cancel </button>
                </form> 
            </div>

            
        </>
    )
}

export default EditEvents;
