import { useState, useEffect } from 'react';
import React from "react";
import '../styles/events.css';
import { Link } from "react-router-dom";
import { useGetUser } from '../hooks/useGetUser';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Events() {
  const navigate = useNavigate();
  const user = useGetUser();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    try {
      fetch("http://localhost:3000/events/", { method: "GET" })
        .then((response) => response.json())
        .then((events) => setEvents(events));
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    }
  });

  function handleNewEventClick (){
    navigate('/newevent');
  }

  function handleEditEvent (selectedEvent){
    navigate('/editevent');
    window.localStorage.setItem("selectedEvent" , JSON.stringify(selectedEvent));
  }  

  async function handleDeleteEventClick(selectedEvent) {
    const toDelete = confirm(`Are you sure you want to delete the event ${selectedEvent.name}?`);
    if (toDelete) {
        try {
            const response = await axios.delete(`http://localhost:3000/events/${selectedEvent._id}`);
            if (response.status === 204) {
                alert("Event deleted successfully");
                navigate('/events');

            } else if(response.status === 404){
                alert("Event not found. Please try again.");
            } else{
              alert("Something went wrong. Please try again.")
            }
        } catch (err) {
            console.log(err);
            alert("Something went wrong. Please try again.");
        }
    }
}


  
  return (
    <>
      <header>
        {" "}
        InfoMediCure
        <nav>
          <ul>
            <li>
              {" "}
              <Link to="/events"> Events </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/information"> Disease Information </Link>
            </li>
            <li>
              {" "}
              <Link to="/profile"> Profile </Link>{" "}
            </li>
          </ul>
        </nav>
      </header>
      

      <div>
    <button className="event-create-btn" onClick={handleNewEventClick}>Create Event</button>
    {events.map((event) => (
        <div className="event-card-item" key={event._id}>
            <h4>
            <b>Name: {event.name}</b>
            </h4>
            <p>Description: {event.description}</p>
            <p>Time: {event.time}</p>
            <p>Date: {event.date}</p>
            <div className="button-container">
                <button className="edit-event-btn" onClick={() => handleEditEvent(event)}>Edit Event</button>
                {user.role === "Admin" && (
                    <button className="event-create-btn" onClick={() => handleDeleteEventClick(event)}>Delete Event</button>
                )}
            </div>
            <hr />
        </div>
    ))}
</div>


      
    </>
  );
}
