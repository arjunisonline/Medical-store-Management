import { useState } from "react";
import Navbar from "../navbar";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser as loginUserAction } from "../store/authslice";


const Login = ()=>{
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState();
    var [errorMessage, setErrorMessage] = useState();
    var dispatch = useDispatch();
    var navigate = useNavigate();

    function loginUser(event){
      event.preventDefault();
      const users = JSON.parse(localStorage.getItem('users'));
      const existingUser = users.find(user => user.email === email && user.password === password);

    if (!existingUser) {
      setErrorMessage('Invalid email or password');
      return;
    }

    dispatch(loginUserAction(existingUser));
    navigate('/');
  
    }
    return(
        <div>
      <Navbar />
      <div className="container-fluid">
        <div className='img-container'>
            <img src="/bg-blur.jpg" alt="" className='background-image img-fluid' />
        <div className='card'>
          <h2>Login</h2>
          <form onSubmit={loginUser}>
  <div class="mb-3">
    <label for="" class="form-label">Email address</label>
    <input type="email" class="form-control" id=""onInput={(event)=>{setEmail(event.target.value)}}></input>
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Password</label>
    <input type="password" class="form-control" id="" onInput={(event)=>{setPassword(event.target.value)}}></input>
  </div>
  <div className="mb-3">
    <p>Don't Have an account? <NavLink
  to="/signup"
>
  Signup
</NavLink></p>
 <button type="submit" class="btn btn-primary" >Login</button>
  </div>
</form>
{errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
        </div>
        </div>
        
      </div>

    </div>
    )
}
export default Login;