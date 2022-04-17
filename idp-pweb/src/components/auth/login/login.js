import React, { useRef, useState } from "react";
import { useAuth } from "../../../contexts/contexts";
import { Link, useHistory } from "react-router-dom";
import './login.css';
import login_logo from './login_logo.svg';
import profilePic from './profile_pic.svg';

export default function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef(); 
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
   
    function handleLogIn(e) {
        e.preventDefault()
        handleSubmit(e);
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("");
            setLoading(true);
            const result = await login(usernameRef.current.value, passwordRef.current.value);
            history.push("/")
        } catch(error) { 
          setError(error.message);
        }
    
        setLoading(false);
    }

    
    return (
        <>
            <div class="lg:columns-2 gap-0 login-container">
                <div className="photo-container">
                    <img src={login_logo} class='side-photo'></img>
                </div>
                <form className="login-form" onSubmit={handleLogIn}>
                    <img src={profilePic} className="profile-pic"></img>
                    <h2 className="login-title">WELCOME</h2>
                    
                    <div class="section">
                        <div class="login-input-wrapper">
                            <i class="fa fa-user font-awesome-icon"></i>
                            <input class="custom-input" type="text" id="username" name="username" placeholder='Username' ref={usernameRef}></input>
                        </div>
                    </div>

                    <div class="section">
                        <div class="login-input-wrapper">
                            <i class="fa fa-lock font-awesome-icon"></i>
                            <input class="custom-input" type="password" id="password" name="password" placeholder='Password' ref={passwordRef}></input>
                        </div>
                    </div>

                    <button className='submit-button' type='submit'>Submit</button>
                    <div className="w-100 text-center mt-2">
                        No account? <Link to="/register" className="register-link">Register</Link>
                    </div>
                </form>
            </div>
        </>
    )
}