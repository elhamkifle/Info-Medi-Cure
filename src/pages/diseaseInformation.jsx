import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import '../styles/information.css'
import axios from 'axios';

function DiseaseInformation(){
    const [information, setInformation] = useState([])
    const user = useGetUser();
    const navigate = useNavigate();

    useEffect(() =>{
        try{
        fetch("http://localhost:3000/information/", { method: "GET" })
            .then((response) => response.json())
            .then((information) => setInformation(information));
        }
        catch(err){
            console.log(err);
            alert("Something went wrong. Please try again.");
        }
    })

    const handleNewInfoClick = (event) => {
        navigate("/newinformation");
    }

    function handleEditInformation (selectedInfo){
        window.localStorage.setItem("selectedInfo" , JSON.stringify(selectedInfo));
        navigate('/editinformation');
    }  
    
      async function handleDeleteInfo(selectedInfo) {
        const toDelete = confirm(`Are you sure you want to delete the information ${selectedInfo.diseaseName}?`);
        if (toDelete) {
            try {
                const response = await axios.delete(`http://localhost:3000/information/${selectedInfo._id}`);
                if (response.status === 204) {
                    alert("Information deleted successfully");
                    navigate('/information');
    
                } else if(response.status === 200){
                    alert("Information not found. Try refreshing the page.");
                } else{
                  alert("Something went wrong. Please try again.")
                }
            } catch (err) {
                console.log(err);
                alert("Something went wrong. Please try again.");
            }
        }
    }





    return(
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

      <h2> Disease Information </h2>
      {user.role === "Doctor" && (
                              <button onClick={handleNewInfoClick}> Add New </button>)}
        
              <div>
              
              {information.map((information) => (
                  <div className="information-item" id = "information-item" key={information._id}>
                      <h4>
                        <p className="name"> <b>Name: {information.diseaseName}</b> </p>
                      </h4>
                      <p className="description">Description: {information.diseaseDescription}</p>
                      <p className="symptoms">Symptoms: {information.symptoms}</p>
                      <div className="button-container">
                          {user.role === "Doctor" && (
                              <button onClick={() => handleEditInformation(information)}>Edit Information </button>
                          )}
                          {user.role === "Admin" && (
                              <button onClick={() => handleDeleteInfo(information)}>Delete Information </button>)}
                      </div>
                  </div>
              ))}
          </div>

          </>
          
    )
}

export default DiseaseInformation;