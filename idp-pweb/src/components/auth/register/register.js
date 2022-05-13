import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/contexts";
import { postProfile } from "../../../contexts/apis";
import { Link, useHistory } from "react-router-dom";
import { database } from "../../../firebase";
import './register.css';
import registerPhoto from './register-photo.svg';
import Step1 from "./step1/step1";
import Step2 from "./step2/step2";
import { auth } from "../../../firebase";

export default function SignUp() {
    const { signup } = useAuth();
    const history = useHistory();

    const [currentStep, setStep] = useState(0);
    const [currentButton, setCurrentButton] = useState('next');

    const [queryStatus, setQueryStatus] = useState({ 
        error: "", success: "", loading: false });
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: '',
        userType: '',
        password: '',
        group: {
            adults: 0,
            children: 0,
            elders: 0,
            pets: 0
        }
    });

    const validateFirstStep = () => {
        const errors = [];
        if (newUser.name === '') {
            errors.push('Please enter your name');
        }
        if (newUser.email === '') {
            errors.push('Please enter your email');
        }
        if (newUser.phone === '') {
            errors.push('Please enter your phone number');
        }
        if (newUser.userType === '') {
            errors.push('Please enter your user type');
        }
        if (newUser.password === '') {
            errors.push('Please enter your password');
        }
        return errors;
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if(currentButton === 'submit') {
            const userData = {
                name: newUser.name,
                email: newUser.email,
                userType: newUser.userType === 'I offer help' ? 'provider' : 'requester',
                phone: newUser.phone,
                group: newUser.group
            }

            try {
              await signup(newUser.email, newUser.password);
              postProfile(userData, auth.currentUser.auth.currentUser.accessToken, succesPostProfile, failurePostProfile);
            } catch(error) {
                setQueryStatus({
                    error: "Profile creation failed!", 
                    success: "", 
                    loading: false 
                });
            }
        }
    }

    const succesPostProfile = () => {
        localStorage.setItem("token", auth.currentUser.auth.currentUser.accessToken);
        localStorage.setItem("email", newUser.email);
        setQueryStatus({ 
            error: "", 
            success: "Profile created successfully!", 
            loading: false 
        });
        history.push("/");
    }
    const failurePostProfile = () => {
        setQueryStatus({ 
            error: "Profile creation failed!", 
            success: "", 
            loading: false 
        });
    }

    const handleNameChange = (value) => setNewUser({...newUser, name: value });
    const handlePhoneChange = (value) => setNewUser({...newUser, phone: value });
    const handleEmailChange = (value) => setNewUser({...newUser, email: value });
    const handleUserTypeChange = (value) => setNewUser({...newUser, userType: value });
    const handlePasswordChange = (value) => setNewUser({...newUser, password: value });

    const updateStep= () => {
        const errors = validateFirstStep();
        if(errors.length === 0) {
            setStep((currentStep + 1));
            setQueryStatus({
                error: "",
                success: "",
                loading: false
                });
        } else {
            setQueryStatus({
                error: errors[0],
                success: "",
                loading: false
            });
        }
    }
    useEffect(() => setCurrentButton(currentStep === 0 ? 'next' : 'submit'), [currentStep]);

    const increaseGroupMember = (member) => {
        if (member === 'adults')
            setNewUser({...newUser, group: {...newUser.group, adults: newUser.group.adults + 1}});
        if (member === 'children') 
            setNewUser({...newUser, group: {...newUser.group, children: newUser.group.children + 1}});
        if (member === 'elders') 
            setNewUser({...newUser, group: {...newUser.group, elders: newUser.group.elders + 1}});
        if (member === 'pets') 
            setNewUser({...newUser, group: {...newUser.group, pets: newUser.group.pets + 1}});
    }
    const decreaseGroupMember = (member) => {
        if (member === 'adults' && newUser.group.adults > 0)
            setNewUser({...newUser, group: {...newUser.group, adults: newUser.group.adults - 1}});
        if (member === 'children' && newUser.group.children > 0)
            setNewUser({...newUser, group: {...newUser.group, children: newUser.group.children - 1}});
        if (member === 'elders' && newUser.group.elders > 0)
            setNewUser({...newUser, group: {...newUser.group, elders: newUser.group.elders - 1}});
        if (member === 'pets' && newUser.group.pets > 0)
            setNewUser({...newUser, group: {...newUser.group, pets: newUser.group.pets - 1}});
    }

    return (
        <div>
            <div className="lg:columns-2 gap-0 login-container">
                <div className="photo-container">
                    <img src={registerPhoto} alt="register" className='side-photo'/>
                </div>
                <div className="login-form">
                    {currentStep[0] === 0 || currentStep === 0 ?
                        <Step1
                            name={newUser.name}
                            phone={newUser.phone}
                            email={newUser.email}
                            userType={newUser.userType}
                            password={newUser.password}
                            handleNameChange={handleNameChange}
                            handleEmailChange={handleEmailChange}
                            handleUserTypeChange={handleUserTypeChange}
                            handlePhoneChange={handlePhoneChange}
                            handlePasswordChange={handlePasswordChange}
                            updateStep={updateStep}
                        ></Step1> :
                        <Step2
                            adults={newUser.group.adults}
                            children={newUser.group.children}
                            elders={newUser.group.elders}
                            pets={newUser.group.pets}
                            increaseGroupMember={increaseGroupMember}
                            decreaseGroupMember={decreaseGroupMember}
                        ></Step2> 
                    }
                    {currentStep[0] === 0 || currentStep === 0 ?
                        <button className='register-submit-button' onClick={updateStep}>Next</button> :
                        <button className='register-submit-button' id='register-btn' 
                        onClick={handleSubmit} type='submit'>Register</button>}
                    <div className="mt-4 mb-4">
                        {queryStatus.error && <div className="text-red-600">{queryStatus.error}</div>}
                    </div>
                    <div className="mb-4">
                        {queryStatus.success && <div className="text-green-600">{queryStatus.success}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}