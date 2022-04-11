import React, { Component } from "react";
import './offer-form.css';

class OfferForm extends Component {
    constructor(props) {
        super(props);
    }

    addIdentifier(e) {
        if(e.key === 'Enter') {
            const identifier = document.getElementById('identifier').value;
            const identifierList = document.getElementById('list').value;
    
            document.getElementById('list').value = identifierList + " " + identifier;
            document.getElementById('identifier').value = '';
        }
    }

    handleSubmit() {

    }

    render() {

        return (
            <form className="offer-container" onSubmit={this.handleSubmit}>
                <h2 className="offer-title">Create an offer</h2>
                <input className="offer-form-input" placeholder="Title"></input>
                <input className="offer-form-input" placeholder="Subtitle"></input>
                <div className="short-input-wrapper" >
                    <input className="offer-form-input-short" placeholder="Location"></input>
                    <input className="offer-form-input-short" placeholder="Interval"></input>
                </div>
                <textarea className="offer-form-input" name="Text1" cols="40" rows="5" placeholder="Description"></textarea>
                <input className="identifiers-input" id='identifier' placeholder="Identifiers (ex. #food)" onKeyUp={this.addIdentifier}></input>
                <textarea id='list' className="identifiers-text" name="Text1" cols="40" rows="5"></textarea>

                <div className="button-container">
                    <button className="offer-submit-btn">Submit</button>
                </div>
            </form>
        )
    }
}

export default OfferForm;