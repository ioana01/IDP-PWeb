import React, { Component } from "react";
import './offer-form.css';
import { auth, database } from "../../firebase";
import { postOffer } from '../../contexts/apis';
import $ from 'jquery';
const axios = require('axios');
const qs = require('qs');
class OfferForm extends Component {
    constructor(props) {
        super(props);
    }

    addIdentifier(e) {
        if(e.key === " ") {
            const identifier = document.getElementById('identifier').value;
            const identifierList = document.getElementById('list').value;
    
            document.getElementById('list').value = (identifierList !== '' ? identifierList + " " + identifier : identifier).trim();
            document.getElementById('identifier').value = '';
        }
    }

    handleSubmit() {
        if(document.getElementById('identifier').value === '') {
            const offerData = {
                title: document.getElementById('title').value,
                subtitle: document.getElementById('subtitle').value,
                location: document.getElementById('location').value,
                interval: document.getElementById('interval').value,
                description: document.getElementById('description').value,
                identifiers: document.getElementById('list').value.split(' '),
                author: auth.currentUser.email,
                favorite: false
            }

            postOffer(offerData);
        }
    }

    render() {

        return (
            <form className="offer-container">
                <h2 className="offer-title">Create an offer</h2>
                <input className="offer-form-input" placeholder="Title" id='title' name='title'></input>
                <input className="offer-form-input" placeholder="Subtitle" id='subtitle' name='subtitle'></input>
                <div className="short-input-wrapper" >
                    <input className="offer-form-input-short" placeholder="Location" id='location' name='location'></input>
                    <input className="offer-form-input-short" placeholder="Interval" id='interval' name='interval'></input>
                </div>
                <textarea className="offer-form-input" name="description" cols="40" rows="5" placeholder="Description" id='description'></textarea>

                <input className="identifiers-input" name='identifier' id='identifier' placeholder="Identifiers (ex. #food)" onKeyUp={this.addIdentifier}></input>
                <textarea id='list' className="identifiers-text" name="list" cols="40" rows="5"></textarea>

                <div className="button-container">
                    <button className="offer-submit-btn" onClick={this.handleSubmit.bind(this)}>Submit</button>
                </div>
            </form>
        )
    }
}

export default OfferForm;