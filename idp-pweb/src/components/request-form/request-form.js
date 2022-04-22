import React from 'react';

export default function RequestForm() {
    return (
        <div>
            <form className="offer-container">
                <h2 className="offer-title">Create a help request</h2>
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
        </div>
    );
}