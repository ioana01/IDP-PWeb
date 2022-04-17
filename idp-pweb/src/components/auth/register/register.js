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
    const phoneRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [currentStep, setStep] = useState(0);

    const [name, setName] = useState('');
    const [phone, setphone] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [password, setPassword] = useState('');
    const [currentButton, setButton] = useState('next');
    const [group, setGroup] = useState({});

    async function handleSubmit(e) {
        e.preventDefault()

        if(currentButton === 'submit') {
            const userData = {
                name: name,
                email: email,
                userType: userType,
                phone: phone,
                group: group
            }
            database.ref('users').push(userData);
        
            try {
              setError("");
              setLoading(true);
              await signup(email, password);
              history.push("/");
            } catch(error) {
                setError(error.message);
            }
        
            setLoading(false);
        }
    }

    function updateStep() {
        setName(document.getElementById('name').value);
        setEmail(document.getElementById('email').value);
        setphone(document.getElementById('phone').value);
        setUserType(document.getElementById('userType').value);
        setPassword(document.getElementById('password').value);
        setStep((currentStep + 1));
    }

    function setGroupDescription() {
        setButton('submit');

        const group = {
            adults: document.getElementById('adults').value ?? 0,
            children: document.getElementById('children').value ?? 0,
            elders: document.getElementById('elders').value ?? 0,
            pets: document.getElementById('pets').value ?? 0
        }

        setGroup(group);
    }

    return (
        <>
            <div className="lg:columns-2 gap-0 login-container">
                <div className="photo-container">
                    <img src={registerPhoto} className='side-photo'></img>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    {currentStep[0] === 0 || currentStep === 0 ?
                        <Step1 
                            nameRef={nameRef}
                            phoneRef={phoneRef}
                            passwordRef={passwordRef}
                            emailRef={emailRef}
                            userTypeRef={userTypeRef}
                        ></Step1> :
                        <Step2></Step2> 
                    }
                    {currentStep[0] === 0 || currentStep === 0 ?
                        <button className='register-submit-button' onClick={updateStep}>Next</button> :
                        <button className='register-submit-button' onClick={setGroupDescription} type='submit'>Register</button>}
                </form>
            </div>
        </>
    )
}