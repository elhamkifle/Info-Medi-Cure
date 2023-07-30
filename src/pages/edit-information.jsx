import React from "react";
import { useState } from "react";
import '../styles/createEvents.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function EditInfo(){
    const infoToEdit = JSON.parse(window.localStorage.getItem('selectedInfo'));

    const navigate = useNavigate();
    const [editedInfo, setEditedInfo] = useState({
        diseaseName: infoToEdit.diseaseName,
        diseaseDescription: infoToEdit.diseaseDescription,
        symptoms: infoToEdit.symptoms,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        let isEmpty = false;

        Object.values(editedInfo).forEach((value) => {
            if (value.trim() === '') {
                isEmpty = true;
            }
        });

        if (isEmpty) {
            alert('Please fill in all fields.');
            return;
        }

        console.log(editedInfo);

        try {
            const infoEdited = await axios.put(`http://localhost:3000/information/${infoToEdit._id}`, editedInfo);
            if (infoEdited.status === 200) {
                alert("Information not found. Try refreshing the page.");
            } else if (infoEdited.status === 204) {
                alert("Information updated");
                navigate('/information');
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
        
    };

    const handleChange = (event) => {
        const {name,value} = event.target;
        setEditedInfo({...editedInfo, [name]: value});
    };
    
    const handleCancel = (event) => {
        navigate('/information');
    }
    return(
        <>
            <div className="createEvents"> 
                <h2> Edit Information </h2>
                <form>
                    <label htmlFor="diseaseName">Name</label><br/>
                    <input type="text" id="diseaseName" name="diseaseName" onChange={handleChange} value={editedInfo.diseaseName}/><br/>
                    <label htmlFor="diseaseDescription">Description:</label><br/>
                    <input type="text" id="diseaseDescription" name="diseaseDescription" onChange={handleChange} value={editedInfo.diseaseDescription}/><br/>
                    <label htmlFor="symptoms">Symptoms:</label><br/>
                    <input type="text" id="symptoms" name="symptoms" onChange={handleChange} value={editedInfo.symptoms}/><br/>
                    
                    <input type="submit" value="Submit" onClick={handleSubmit}/>
                    <button className="cancel" onClick={handleCancel}> Cancel </button>
                </form> 
            </div>

            
        </>
    )
}

export default EditInfo;
