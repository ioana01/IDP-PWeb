import React, {Component} from "react";
import './side-menu.css';

class SideMenu extends Component {
    render() {
        return (
            <div className="side-menu col-span-2">
                <p className="menu-section">All</p>
                <p className="menu-section">Transport</p>
                <p className="menu-section">Accommodation</p>
                <p className="menu-section">Food</p>
                <p className="menu-section">Others</p>
                <p className="menu-section">My favorites</p>
            </div>
        )
    }
}

export default SideMenu;