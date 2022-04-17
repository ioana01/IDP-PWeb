import React, { Component } from "react";
import './offers-list.css';
import SideMenu from "../side-menu/side-menu";
import SearchBar from "../search-bar/search-bar";
import Card from "../card/card";

class OffersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedList: []
        }
    }

    addNewSavedItem(cardId) {

    }

    render() {
        return (
            <div class="grid grid-cols-6 gap-0">
                <SideMenu/>
                <div className="card-list col-span-4">
                    <SearchBar/>
                    <div className="cards-container lg:columns-2 gap-8">
                        <Card addNewSavedItem={this.addNewSavedItem}/>
                        <Card addNewSavedItem={this.addNewSavedItem}/>
                        <Card addNewSavedItem={this.addNewSavedItem}/>
                        <Card addNewSavedItem={this.addNewSavedItem}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default OffersList;