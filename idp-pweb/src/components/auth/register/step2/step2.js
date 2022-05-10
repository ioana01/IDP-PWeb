import React, {Component, setState} from "react";
import { Link } from "react-router-dom";
import './step2.css';
import QuantityChange from "./quantity-change/quantity-change";

export default function Step2(props) {
    return(
        <div>
            <h2 className="register-title-step2">Describe your group</h2>
            <div className="input-group">
                <div className="quantity-wrapper">
                    <span className="category-label mr-2">Adults (18 - 65)</span>
                    <QuantityChange
                        addButton={props.increaseGroupMember}
                        decreaseButton={props.decreaseGroupMember}
                        member="adults"
                        value={props.adults}
                        id='adults'
                    ></QuantityChange> 
                </div>

                <div className="quantity-wrapper">
                    <span className="category-label mr-2">Children ({"<"} 18)</span>
                    <QuantityChange
                        addButton={props.increaseGroupMember}
                        decreaseButton={props.decreaseGroupMember}
                        member="children"
                        value={props.children}
                        id='children'
                    ></QuantityChange>  
                </div>

                <div className="quantity-wrapper">
                    <span className="category-label mr-2">Elders ({">"} 65)</span>
                    <QuantityChange
                        addButton={props.increaseGroupMember}
                        decreaseButton={props.decreaseGroupMember}
                        member="elders"
                        value={props.elders}
                        id='elders'
                    ></QuantityChange>                       
                </div>

                <div className="quantity-wrapper">
                    <span className="category-label mr-2">Pets</span>
                    <QuantityChange
                        addButton={props.increaseGroupMember}
                        decreaseButton={props.decreaseGroupMember}
                        member="pets"
                        value={props.pets}
                        id='pets'
                    ></QuantityChange>                       
                </div>
            </div>
        </div>
        )
}