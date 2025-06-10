import { useState } from "react";
import Navbar from "../navbar";
import {NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  var [name, setName] = useState('');
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [confirmPassword, setConfirmPassword] = useState('');
  var [errorMessage, setErrorMessage] = useState('');
  var navigate = useNavigate();

  function RegisterUser(event) {
  event.preventDefault();

  const users = JSON.parse(localStorage.getItem('users'));

  // Check if email already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    setErrorMessage('Email already exists');
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    setErrorMessage("Passwords do not match");
    return;
  }

  // Save new user
  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  // Redirect to login
  navigate('/login');
}

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className='img-container'>
          <img src="/bg-blur.jpg" alt="" className='background-image img-fluid' />
          <div className='card'>
            <h2>Sign Up</h2>
            <form>
              <div class="mb-3">
                <label for="" class="form-label">Name</label>
                <input type="text" class="form-control" id="" onInput={(event) => { setName(event.target.value) }}></input>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Email address</label>
                <input type="email" class="form-control" id="" onInput={(event) => { setEmail(event.target.value) }}></input>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Password</label>
                <input type="password" class="form-control" id="" onInput={(event) => { setPassword(event.target.value) }}></input>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="" onInput={(event) => { setConfirmPassword(event.target.value) }}></input>
              </div>
              <div className="mb-3">
                <p>Have an account? <NavLink
                  to="/login"
                >
                  Login
                </NavLink></p>
                <button type="submit" class="btn btn-primary" onClick={RegisterUser}>Submit</button>
              </div>

            </form>
            {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
          </div>
        </div>

      </div>

    </div>
  )
}
export default Signup;