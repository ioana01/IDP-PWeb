import React, {Component} from "react";
import { Link } from "react-router-dom";
import './step1.css';

class Step1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <h2 className="register-title">CREATE AN ACCOUNT</h2>

                <div className="w-100 text-center mt-2 option">
                    Already have an account? <Link to="/login" className="register-link">Login</Link>
                </div>
                    
                <div class="register-section">
                    <div class="register-input-wrapper">
                        <i class="fa fa-user font-awesome-icon-register"></i>
                        <input class="register-custom-input" type="text" id="name" name="name" placeholder='Name'></input>
                    </div>
                </div>

                <div class="register-section">
                    <div class="register-input-wrapper">
                        <i class="fa fa-envelope font-awesome-icon-register"></i>
                        <input class="register-custom-input" type="text" id="email" name="email" placeholder='Email'></input>
                    </div>
                </div>

                <div class="register-section">
                    <div class="register-input-wrapper">
                        <i class="fa fa-phone font-awesome-icon-register"></i>
                        <input class="register-custom-input" type="text" id="phone" name="phone" placeholder='Phone'></input>
                    </div>
                </div>

                <div class="register-section">
                    <div class="register-input-wrapper">
                        <i class="fa fa-arrow-down font-awesome-icon-register"></i>
                        <select id="cars" name="cars" class="register-custom-input">
                            <option className="register-option">Type of account</option>
                            <option className="register-option">Beneficiar</option>
                            <option className="register-option">Donator</option>
                        </select>
                        
                    </div>
                </div>

                <div class="register-section">
                    <div class="register-input-wrapper">
                        <i class="fa fa-lock font-awesome-icon-register"></i>
                        <input class="register-custom-input" type="password" id="password" name="password" placeholder='Password'></input>
                    </div>
                </div>
            </>
        )
    }
}

export default Step1;