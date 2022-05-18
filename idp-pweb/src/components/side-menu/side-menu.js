import React from "react";
import './side-menu.css';

export default function SideMenu(props) {
    console.log(props.profile);
    return (
        <div className="side-menu col-span-6 sm:col-span-2">
            <p className="menu-section" onClick={() => props.setCurrentTab('')}>All</p>
            <p className="menu-section" onClick={() => props.setCurrentTab('transport')}>Transport</p>
            <p className="menu-section" onClick={() => props.setCurrentTab('accomodation')}>Accommodation</p>
            <p className="menu-section" onClick={() => props.setCurrentTab('food')}>Food</p>
            <p className="menu-section" onClick={() => props.setCurrentTab('others')}>Others</p>
            <p className="menu-section" onClick={() => props.setCurrentTab('favorites')}>Favorites</p>
            {props.profile?.userType === 'provider' && props.currentTab !== 'requests' &&
            <p className="menu-section" onClick={() => props.setCurrentTab('myOffers')}>My offers</p>}
            {props.profile?.userType === 'requester' && props.currentTab !== 'offers' && 
            <p className="menu-section" onClick={() => props.setCurrentTab('myRequests')}>My requests</p>}
        </div>
    );
};