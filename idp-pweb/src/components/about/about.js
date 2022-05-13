import React, { Component } from "react";
import './about.css';
import aboutLogo from './about-logo.svg';

export default function About(props) {
    return (
        <>
            <div className="lg:columns-2 gap-0 top-info">
                <div className="about-logo">
                    <img src={aboutLogo}></img>
                </div>
                <div>
                    <h2 className="about-title">Together for Ukraine</h2>
                    <p className="top-info-p">
                        Now is the time to come together to support each other. Either you are looking for 
                        help or to lend a hand, this is the perfect place for you. Free and easy to use,
                        this platform might help you find a solution to your needs.
                    </p>
                </div>    
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-8 steps">
                <div>
                    <h3 className="step-title">Step 1</h3>
                    <p>
                        Choose the type of account you would like to use ('I offer help' / 'I need help') and register.
                    </p>
                </div>
                <div>
                    <h3 className="step-title">Step 2</h3>
                    <p>
                        Post a request/ an offer of help and a few details about it.
                    </p>
                </div>
                <div>
                    <h3 className="step-title">Step 3</h3>
                    <p>
                        Contact the author of the post and stay in touch.
                    </p>
                </div>
            </div>
        </>
    );
}