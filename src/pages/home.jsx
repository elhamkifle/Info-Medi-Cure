import React, { useState } from "react";
import axios from 'axios';
import '../styles/home.css'
import { useNavigate } from "react-router-dom";

function MyPage() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState(
    {
      name: '',
      password:  ''
    }
  )

  const [signUpUser, setSignUpUser] = useState( 
    {
      name: '',
      password: '',
      role: ''
    }
  )

  const handleChange = (event) => {
    const {name,value} = event.target;
    setLoginUser({...loginUser, [name]: value});

};

const handleSignUpChange = (event) => {
  const {name,value} = event.target;
  setSignUpUser({...signUpUser, [name]: value});
};


const handleLoginSubmit = async (event) => {
  event.preventDefault();
  let isEmpty = false;

  Object.values(loginUser).forEach((value) => {
      if (value.trim() === '') {
          isEmpty = true;
      }
  });

  if (isEmpty) {
      alert('Please fill in all fields.');
      return;
  }

  try{
    const user = await axios.post("http://localhost:3000/login/", loginUser);
    if (user.status == 200){
      window.localStorage.clear();
      window.localStorage.setItem("user", JSON.stringify(user));
      navigate('/events');
    }

    else if (user.status == 204){
      alert("Wrong name or password. Please try again.");
    }

    else{
      console.log(user.status);
      alert("Something went wrong. Please try again.");
    }
    

}
catch(err){
    console.log(err);
}


  
}

const handleSignUpSubmit = async (event) => {
  event.preventDefault();

  let isEmpty = false;

        Object.values(signUpUser).forEach((value) => {
            if (value.trim() === '') {
                isEmpty = true;
            }
        });

        if (isEmpty) {
            alert('Please fill in all fields.');
            return;
        }

        try{
            const user = await axios.post("http://localhost:3000/", signUpUser);
            if (user.status == 201){
              window.localStorage.clear();
              window.localStorage.setItem("user", JSON.stringify(user));
              console.log(user.data)
              navigate('/events');
            }

            else if (user.status == 202){
              alert("Name already in use. Please try another name.");
            }

            else{
              alert("Something went wrong. Please try again.")
            }
            

        }
        catch(err){
            console.log(err);
        }

}


  function toggleForm() {
    setShowLoginForm(!showLoginForm);
  }

  return (
      <div className="body">
      <header> InfoMediCure </header>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1.5 }}>
            <p className="blurp"> 
            Get updated and accurate information <br />
            from professionals who care.
            </p>
        </div>
        <div style={{ flex: 3 }}>
          {showLoginForm ? (
            <form>
              <h2>Login</h2>
              <label htmlFor="name">Username:</label>
              <br />
              <input type="text" id="name" name="name" onChange={handleChange}/>
              <br />
              <label htmlFor="password">Password:</label>
              <br />
              <input type="password" id="password" name="password" onChange={handleChange}/>
              <br />
              <br />
              <input type="submit" value="Submit" onClick={handleLoginSubmit}/>
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={toggleForm}>
                  Sign up
                </a>
              </p>
            </form>
          ) : (
            <form>
              <h2>Sign Up</h2>
              <label htmlFor="name">Username:</label>
              <br />
              <input type="text" id="name" name="name" onChange={handleSignUpChange} />
              <br />
              <label htmlFor="password">Password:</label>
              <br />
              <input type="password" id="password" name="password" onChange={handleSignUpChange}/>
              <br />
              <label htmlFor="role">Role:</label>
              <select id="role" name="role" onChange={handleSignUpChange} >
                <option value="">--Please choose your credentials --</option>
                <option value="User">User</option>
                <option value="Doctor">Doctor</option>
              </select>
              <br />
              <input type="submit" value="Submit" onClick={handleSignUpSubmit}/>

              <p>
                Already have an account?{" "}
                <a href="#" onClick={toggleForm}>
                  Login
                </a>
              </p>
            </form>
          )}

          <footer> © 2023 Elham Mulugeta Kifle</footer>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
