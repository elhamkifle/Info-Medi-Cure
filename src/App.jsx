import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Events from './pages/events';
import CreateEvents from './pages/create-events';
import MyPage from './pages/home';
import Profile from './pages/profile';
import EditEvents from './pages/edit-events';
import EditProfile from './pages/edit-profile';
import DiseaseInformation from './pages/diseaseInformation';
import CreateInformation from './pages/create-information';
import EditInfo from './pages/edit-information';


function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<MyPage />} />  
        <Route path="/events" element={<Events />} />  
        <Route path="/newevent" element={<CreateEvents />} />    
        <Route path="/profile" element={<Profile />} />  
        <Route path='/editevent' element={<EditEvents/>}></Route>      
        <Route path='/edituser' element={<EditProfile/>}></Route>
        <Route path='/information' element={<DiseaseInformation/>}></Route>
        <Route path='/newinformation' element={<CreateInformation/>}></Route>
        <Route path='/editinformation' element={<EditInfo/>}></Route>
      
      </Routes>
    </Router>
  );
}

/* <header>
        <ul>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>             
            <Link to="/newevent"> Create A New Event </Link>
            </li>
            <li>   
            <Link to="/"> Profile </Link>
            </li>
        </ul>
        </header> */

export default App;