import React, { Component } from "react";
import './requests-list.css';
import SideMenu from "../side-menu/side-menu";
import SearchBar from "../search-bar/search-bar";
import Card from "../card/card";

export default function RequestsList(){

    const addNewSavedItem = (cardId) => console.log(cardId);

        return (
            <div className="grid grid-cols-6 gap-0">
                <SideMenu/>
                <div className="card-list col-span-4">
                    {/* <SearchBar/> */}
                    <div className="cards-container lg:columns-2 gap-8">
                        <Card addNewSavedItem={addNewSavedItem}/>
                        <Card addNewSavedItem={addNewSavedItem}/>
                        <Card addNewSavedItem={addNewSavedItem}/>
                        <Card addNewSavedItem={addNewSavedItem}/>
                    </div>
                </div>
            </div>
        )
}