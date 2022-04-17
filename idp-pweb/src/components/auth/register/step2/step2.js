import React, {Component, setState} from "react";
import { Link } from "react-router-dom";
import './step2.css';
import QuantityChange from "./quantity-change/quantity-change";

class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adults: 0,
            children: 0,
            elders: 0,
            pets: 0
        }
    }

    addButton(id) {
        document.getElementById(id).value = parseInt(document.getElementById(id).value) + 1;
    }

    decreaseButton(id) {
        const currentQuantity = parseInt(document.getElementById(id).value);
        document.getElementById(id).value = currentQuantity > 0 ? currentQuantity - 1 : 0;
    }

    render() {
        return(
            <>
                <h2 className="register-title-step2">Describe your group</h2>
                <div className="input-group">
                    <div className="quantity-wrapper">
                        <label className="category-label">Adults (18 - 65)</label>
                        <QuantityChange
                            addButton={this.addButton.bind(this)}
                            decreaseButton={this.decreaseButton.bind(this)}
                            id='adults'
                        ></QuantityChange> 
                    </div>

                    <div className="quantity-wrapper">
                        <label className="category-label">Children ({"<"} 18)</label>
                        <QuantityChange
                            addButton={this.addButton.bind(this)}
                            decreaseButton={this.decreaseButton.bind(this)}
                            id='children'
                        ></QuantityChange>  
                    </div>

                    <div className="quantity-wrapper">
                        <label className="category-label">Elders ({">"} 65)</label>
                        <QuantityChange
                            addButton={this.addButton}
                            decreaseButton={this.decreaseButton.bind(this)}
                            id='elders'
                        ></QuantityChange>                       
                    </div>

                    <div className="quantity-wrapper">
                        <label className="category-label">Pets</label>
                        <QuantityChange
                            addButton={this.addButton}
                            decreaseButton={this.decreaseButton.bind(this)}
                            id='pets'
                        ></QuantityChange>                       
                    </div>
                </div>
            </>
        )
    }
}

export default Step2;