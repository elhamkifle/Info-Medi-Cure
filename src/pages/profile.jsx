import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import '../styles/profile.css'
import { useGetUser } from "../hooks/useGetUser";
import axios from 'axios';

export default function Profile(){
  const user = useGetUser();
  const name = user.name;
  const navigate = useNavigate();
  function handleSignOut(){
    var signOut = confirm("Are you sure you want to log out of your account?");
    if(signOut){
      window.localStorage.clear();
      navigate("/");
    }   
  }

  const [showLinks, setShowLinks] = useState(false);
  const handleManageAccountClick = () => {
    setShowLinks(!showLinks);
  };

  const handleDelete = async (event) =>  {
    const deleteAccount = confirm("Are you sure you want to delete your account?");
    if(deleteAccount){
      console.log(deleteAccount);
      console.log(user._id);

      try{
        const accountDeleted = await axios.delete(`http://localhost:3000/${user._id}`);
        console.log(accountDeleted.status);
        if(accountDeleted.status === 204){
          window.localStorage.clear();
          navigate('/');
        } else if(accountDeleted.status === 300){
          alert("User not currently found. Please try again.")
        } else{
          alert("Something went wrong. Please try again later.")
        }

      }
      catch{

      }
    }
  }
  
    return (
        <>
        <header> InfoMediCure 
      <nav>
        <ul>
        <li> <Link to="/events"> Events </Link> </li>
          <li> <Link to="/information"> Disease Information </Link></li>
          <li> <Link to="/profile"> Profile </Link> </li>
        </ul>
      </nav>
      </header>
      <h1>  {name} </h1>
      <button className="profile">  </button>
      <div className="buttons"> 
      <button onClick={handleManageAccountClick}>Manage Your Account</button>
      <button onClick={handleSignOut}> Log Out </button>
      </div>

      {showLinks && (
        <>
          <li> <Link to={'/edituser'}> Edit Your Account </Link></li>
          <li> <Link onClick = {handleDelete}> Delete Your Account </Link></li>
        </>
      )}
      <footer> 2023, Elham Mulugeta Kifle </footer>
      
        </>
    )
}
