import React, { Component } from "react";
import './quantity-change.css';

class QuantityChange extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                <span class="input-group-btn">
                    <button class="btn btn-default btn-subtract sign-btn" type="button" onClick={() => this.props.decreaseButton(this.props.id)}>-</button>
                </span>

                <input id={this.props.id} type="text" class="form-control no-padding text-center item-quantity quantity-input" value={0} onChange={() => console.log(this.props.id)}></input>

                <span class="input-group-btn">
                    <button class="btn btn-default btn-add sign-btn" type="button" onClick={() => this.props.addButton(this.props.id)}>+</button>
                </span>
            </span>
        )
    }
}

export default QuantityChange;