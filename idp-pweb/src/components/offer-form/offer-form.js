import React from "react";
import { auth } from "../../firebase";
import { postOffer } from '../../contexts/apis';
import './offer-form.css';

export default function OfferForm() {

    const token = localStorage.getItem('token');

    const addIdentifier = (e) => {
        if(e.key === " ") {
            const identifier = document.getElementById('identifier').value;
            const identifierList = document.getElementById('list').value;
    
            document.getElementById('list').value = (identifierList !== '' ? identifierList + " " + identifier : identifier).trim();
            document.getElementById('identifier').value = '';
        }
    }

    const handleSubmit = () => {
        if(document.getElementById('identifier').value === '') {
            const offerData = {
                title: document.getElementById('title').value,
                subtitle: document.getElementById('subtitle').value,
                location: document.getElementById('location').value,
                phone: document.getElementById('phone').value,
                interval: document.getElementById('interval').value,
                description: document.getElementById('description').value,
                identifiers: document.getElementById('list').value.split(' '),
                author: auth.currentUser.email,
                favorite: false
            }
            postOffer(offerData, token, succesPostOffer, failurePostOffer);
        }
    }

    const succesPostOffer = (response) => {
        alert('Offer posted successfuly');
        setTimeout(() => window.location.href='/offers', 1000);
    }

    const failurePostOffer = () => {
        alert('Oops, something went wrong...');
    }

    return (
        <div className="offer-container">
            <h2 className="offer-title">Create an offer</h2>
            <input className="offer-form-input" placeholder="Title" id='title' name='title'></input>
            <input className="offer-form-input" placeholder="Subtitle" id='subtitle' name='subtitle'></input>
            <div className="short-input-wrapper" >
                <input className="offer-form-input-short" placeholder="Location" id='location' name='location'></input>
                <input className="offer-form-input-short" placeholder="Interval" id='interval' name='interval'></input>
            </div>
            <input className="offer-form-input" placeholder="Phone contact" id='phone' name='phone'></input>
            <textarea className="offer-form-input" name="description" cols="40" rows="5" placeholder="Description" id='description'></textarea>

            <input className="identifiers-input" name='identifier' id='identifier' placeholder="Identifiers (ex. #food)" onKeyUp={addIdentifier}></input>
            <textarea id='list' className="identifiers-text" name="list" cols="40" rows="5"></textarea>

            <div className="button-container">
                <button className="offer-submit-btn" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};