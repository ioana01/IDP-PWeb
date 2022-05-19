import React from "react";
import { Link } from "react-router-dom";
import './side-menu.css';

export default function SideMenu(props) {
    return (
        <div className="side-menu col-span-6 sm:col-span-2">
            <div>
                <p className="menu-section" onClick={() => props.setCurrentTab('')}>All</p>
                <p className="menu-section" onClick={() => props.setCurrentTab('transport')}>Transport</p>
                <p className="menu-section" onClick={() => props.setCurrentTab('accomodation')}>Accommodation</p>
                <p className="menu-section" onClick={() => props.setCurrentTab('food')}>Food</p>
                <p className="menu-section" onClick={() => props.setCurrentTab('others')}>Others</p>
                <p className="menu-section" onClick={() => props.setCurrentTab('favorites')}>Favorites</p>
            </div>
            {
                props.profile && props.profile.userType === 'requester' && props.list === 'requests' &&
                    <div className="add-wrapper">
                        <Link to="/request" className="add-sign">Add request</Link>
                    </div>
            }
            {
                props.profile && props.profile.userType === 'provider' &&  props.list === 'offers' &&
                    <div className="add-wrapper">
                        <Link to="/offer" className="add-sign">Add offer</Link>
                    </div>
            }
        </div>
    );
};