import React, { useRef, useState } from "react";
import { useAuth } from "../../../contexts/contexts";
import { Link, useHistory } from "react-router-dom";
import './login.css';
import login_logo from './login_logo.svg';
import profilePic from './profile_pic.svg';
import { auth } from "../../../firebase";

export default function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef(); 
    const { login } = useAuth();

    const [queryStatus, setQueryStatus] = useState({ 
        error: "", success: "", loading: false });
    const history = useHistory();
   
    function handleLogIn(e) {
        e.preventDefault()
        handleSubmit(e);
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await login(usernameRef.current.value, passwordRef.current.value);
            console.log(auth.currentUser);
            localStorage.setItem("token", auth.currentUser.auth.currentUser.accessToken);
            history.push("/")
            setQueryStatus({ error: "", success: "Authentication succesful!", loading: false });
        } catch(error) { 
          setQueryStatus({ 
              error: "Authentication failed. Wrong credentials.", 
              success: "", 
              loading: false 
          });
        }
    }
    
    return (
        <div>
            <div className="lg:columns-2 gap-0 login-container">
                <div className="photo-container">
                    <img src={login_logo} className='side-photo' alt="loginLogo"/>
                </div>
                <form className="login-form" onSubmit={handleLogIn}>
                    <img src={profilePic} className="profile-pic" alt="profilePic"/>
                    <h2 className="login-title">WELCOME</h2>
                    <div className="section mt-4">
                        <div className="login-input-wrapper">
                            <i className="fa fa-user font-awesome-icon"></i>
                            <input className="custom-input" type="text" id="username" 
                                name="username" placeholder='Username' ref={usernameRef}></input>
                        </div>
                    </div>

                    <div className="section">
                        <div className="login-input-wrapper">
                            <i className="fa fa-lock font-awesome-icon"></i>
                            <input className="custom-input" type="password" id="password"
                                name="password" placeholder='Password' ref={passwordRef}></input>
                        </div>
                    </div>

                    <button className='submit-button' type='submit'>Submit</button>
                    <div className="mt-4 mb-4">
                        {queryStatus.error && <div className="text-red-600">{queryStatus.error}</div>}
                    </div>
                    <div>
                        {queryStatus.success && <div className="text-green-600">{queryStatus.success}</div>}
                    </div>
                    <div className="w-100 text-center">
                        No account? <Link to="/register" className="register-link">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}