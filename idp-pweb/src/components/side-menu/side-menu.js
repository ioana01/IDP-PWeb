import React, {Component} from "react";
import './side-menu.css';

class SideMenu extends Component {
    render() {
        return (
            <div className="side-menu col-span-6 sm:col-span-2">
                <p className="menu-section" onClick={() => this.props.setCurrentTab(0)}>All</p>
                <p className="menu-section" onClick={() => this.props.setCurrentTab(1)}>Transport</p>
                <p className="menu-section" onClick={() => this.props.setCurrentTab(2)}>Accommodation</p>
                <p className="menu-section" onClick={() => this.props.setCurrentTab(3)}>Food</p>
                <p className="menu-section" onClick={() => this.props.setCurrentTab(4)}>Others</p>
                <p className="menu-section" onClick={() => this.props.setCurrentTab(5)}>My favorites</p>
            </div>
        )
    }
}

export default SideMenu;