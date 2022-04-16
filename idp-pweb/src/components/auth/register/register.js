import React, { useRef, useState } from "react";
import { useAuth } from "../../../contexts/contexts";
import { Link, useHistory } from "react-router-dom";
import { database } from "../../../firebase";
import './register.css';
import registerPhoto from './register-photo.svg';
import Step1 from "./step1/step1";
import Step2 from "./step2/step2";

export default function SignUp() {
    const nameRef = useRef();
    const userTypeRef = useRef();
    const userRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [currentStep, setStep] = useState(0);

    async function handleSubmit(e) {
        e.preventDefault()

        const userData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            userType: userTypeRef.current.value,
        }
        database.ref('users').push(userData);
    
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match");
        }
    
        try {
          setError("");
          setLoading(true);
          await signup(emailRef.current.value, passwordRef.current.value);
          history.push("/");
        } catch(error) {
            setError(error.message);
        }
    
        setLoading(false);
    }

    function updateStep() {
        currentStep = 1;
    }

    return (
        <>
            <div class="lg:columns-2 gap-0 login-container">
                <div className="photo-container">
                    <img src={registerPhoto} class='side-photo'></img>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    {currentStep[0] === 0 || currentStep === 0 ?
                        <Step1></Step1> :
                        <Step2></Step2> 
                    }
                    {currentStep[0] === 0 || currentStep === 0 ?
                        <button className='register-submit-button' onClick={() => setStep((currentStep + 1))}>Next</button> :
                        <button className='register-submit-button' type='submit'>Register</button>}
                </form>
            </div>
        </>
    )
}