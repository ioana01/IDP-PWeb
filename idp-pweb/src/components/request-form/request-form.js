import React, {useState, useEffect} from 'react';
import { auth } from "../../firebase";
import { postRequest } from '../../contexts/apis';
import './request-form.css';

export default function RequestForm() {

    const token = localStorage.getItem('token');

    const [requestForm, setRequestForm] = useState({
        title: "",
        subtitle: "",
        location: "",
        description: "",
        identifiers: [],
        author: auth.currentUser.email,
    });
    const [identifier, setIdentifier] = useState("");
    const [identifierText, setIdentifierText] = useState("");

    const addIdentifier  = (event) => {
        if(event.keyCode === 13) {
            if (!identifier) return;
            setRequestForm({...requestForm, 
                identifiers: [...requestForm.identifiers, identifier]});
        }
    }

    const handleTitle = (value) => setRequestForm({...requestForm, title: value});
    const handleSubtitle = (value) => setRequestForm({...requestForm, subtitle: value});
    const handleLocation = (value) => setRequestForm({...requestForm, location: value});
    const handleDescription = (value) => setRequestForm({...requestForm, description: value});

    useEffect(() => {
        setIdentifier('');
        setIdentifierText(requestForm.identifiers.join(' '));
    }, [requestForm.identifiers]);

    const submitRequest = () => {
        postRequest(requestForm, token, successPostRequest, failurePostRequest);
    };

    const successPostRequest = () => {
        console.log('Request was posted!');
        setRequestForm({
            ...requestForm,
            title: "",
            subtitle: "",
            location: "",
            description: "",
            identifiers: [],
        })
        alert('Request posted successfuly');
    }
    const failurePostRequest = () => {
    }

    return (
        <div className="flex flex-col request-container p-4 items-center">
            <div className="text-2xl font-bold mb-4 text-center">
                <span>Create a help request</span>
            </div>
            <div className='mb-4 mt-2 sm:w-full md:w-3/4 text-sm md:text-base'>
                <input className="rounded-md border-[1px] border-black pb-2 pl-2 w-full 
                    request-form-input" type="text" id="username" name="username" 
                    placeholder='Request title: e.g. Need Accomodation - Galati or Braila county' 
                    value={requestForm.title} 
                    onChange={(event) => handleTitle(event.currentTarget.value)}/>
            </div>
            <div className='mb-4 mt-2 sm:w-full md:w-3/4 text-sm md:text-base'>
                <input className="rounded-md border-[1px] border-black pb-2 pl-2 
                    w-full request-form-input" type="text" id="username" name="username" 
                    placeholder='Request subtitle: e.g. Adult and two children need accomodation' 
                    value={requestForm.subtitle} 
                    onChange={(event) => handleSubtitle(event.currentTarget.value)}/>
            </div>
            <div className='mb-4 mt-2 sm:w-full md:w-3/4 text-sm md:text-base'>
                <input className="rounded-md border-[1px] border-black pb-2 pl-2 
                    w-full request-form-input" type="text" id="username" name="username" 
                    placeholder='Location: e.g. Galati - Isaccea' 
                    value={requestForm.location}
                    onChange={(event) => handleLocation(event.currentTarget.value)}></input>
            </div>
            <div className='mb-4 mt-2 sm:w-full md:w-3/4 text-sm md:text-base'>
                <textarea className="rounded-md border-[1px] border-black pb-2 pl-2 
                    w-full request-form-input" type="text" id="username" name="username" 
                    placeholder='Request description and additional information' 
                    value={requestForm.description}
                    onChange={(event) => handleDescription(event.currentTarget.value)}></textarea>
            </div>
            <div className="sm:w-full md:w-3/4 text-sm md:text-base">
                <input className="request-identifiers-input w-full" name='identifier' id='identifier' 
                    placeholder="Identifiers (ex. #food)" 
                    value={identifier} 
                    onChange={(event) => setIdentifier(event.currentTarget.value)} 
                    onKeyUp={(event) => addIdentifier(event)}/>
                <textarea id='list' className="request-identifiers-text w-full" name="list" 
                    readOnly cols="40" rows="5" value={identifierText}/>                </div>
            <div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white 
                    font-bold py-2 px-4 rounded mt-4' onClick={submitRequest}>Submit</button>
            </div>
        </div>
    );
}