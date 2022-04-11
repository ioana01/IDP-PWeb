import React, { Component } from "react";
import './about.css';
import aboutLogo from './about-logo.svg';

class About extends Component {
    render() {
        return (
            <>
                <div className="lg:columns-2 gap-0 top-info">
                    <div className="about-logo">
                        <img src={aboutLogo}></img>
                    </div>
                    <div>
                        <h2 className="about-title">Title</h2>
                        <p className="top-info-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur consectetur ex in sagittis. Praesent venenatis nisi odio, in tristique felis hendrerit sit amet. Proin ut finibus ex. In ullamcorper vulputate volutpat. Vivamus tristique ornare lacus eu euismod. Aliquam elementum tortor egestas ex pellentesque, id aliquet tortor volutpat. Ut scelerisque metus eros, ac luctus sem ultricies sit amet. Nam dignissim aliquet neque, et aliquam ex dignissim ac.</p>
                    </div>    
                </div>
                <div className="lg:columns-3 steps">
                    <div>
                        <h3 className="step-title">Step 1</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur consectetur ex in sagittis. Praesent venenatis nisi odio, in tristique felis hendrerit sit amet.</p>
                    </div>
                    <div>
                        <h3 className="step-title">Step 2</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur consectetur ex in sagittis. Praesent venenatis nisi odio, in tristique felis hendrerit sit amet.</p>
                    </div>
                    <div>
                        <h3 className="step-title">Step 3</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur consectetur ex in sagittis. Praesent venenatis nisi odio, in tristique felis hendrerit sit amet.</p>
                    </div>
                </div>
            </>
        )
    }
}

export default About;