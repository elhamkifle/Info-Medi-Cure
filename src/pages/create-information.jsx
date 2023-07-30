import React from "react";
import { useState } from "react";
import '../styles/createEvents.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CreateInformation() {
    const navigate = useNavigate();
    const [newInformation, setNewInformation] = useState({
        diseaseName: "",
        diseaseDescription: "",
        symptoms: "",

    });

    const handleChange = (event) => {
        const {name,value} = event.target;
        setNewInformation({...newInformation, [name]: value});

    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        let isEmpty = false;

        Object.values(newInformation).forEach((value) => {
            if (value.trim() === '') {
                isEmpty = true;
            }
        });

        if (isEmpty) {
            alert('Please fill in all fields.');
            return;
        }


            try{
                const infoCreated = await axios.post("http://localhost:3000/information", newInformation);
                if(infoCreated.status == 201){
                    alert("Information created");
                    navigate('/information');
                }
                else if(infoCreated.status == 204){
                    alert("Something went wrong. Please try again.");
                }
                
                }
            catch(err){
                console.log(err);
            }
    }

    function handleCancel(){
        navigate('/information');
    }

    return (
    <div className="createEvents"> 
    <h2> Add a New Information Field </h2>
    <form>
        <label htmlFor="name">Name:</label><br/>
        <input type="text" id="diseaseName" name="diseaseName" onChange={handleChange}/><br/>
        <label htmlFor="diseaseDescription">Description:</label><br/>
        <input type="text" id="diseaseDescription" name="diseaseDescription" onChange={handleChange}/><br/>
        <label htmlFor="symptoms">Symptoms: </label><br/>
        <input type="text" id="symptoms" name="symptoms" onChange={handleChange}/><br/>
        <input type="submit" value="Submit" onClick={handleSubmit}/>
        <button className="cancel" onClick={handleCancel}> Cancel </button>
    </form> 

    
    </div>
    )
}

export default CreateInformation;