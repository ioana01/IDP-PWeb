import React, { Component } from "react";
import { Link } from "react-router-dom";
import './offers-list.css';
import SideMenu from "../side-menu/side-menu";
import SearchBar from "../search-bar/search-bar";
import Card from "../card/card";
import { getOffers, getFavorites } from '../../contexts/apis';
import { auth, database } from "../../firebase";

class OffersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritesList: [],
            currentUser: {},
            offersList: [],
            currentTab: 0,
            initialOffersList: [],
            initialFavoritesList: []
        }
    }

    async componentDidMount() {
        getOffers(this.setOffers, this);
        getFavorites(this.setFavorites, this);

        const usersRef = database.ref("users");

        await usersRef.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                
                if(childData.email === auth.currentUser.email) {
                    this.setState({ currentUser: childData });
                }
            });

        });
    }

    setOffers(list, scope) {
        console.log(list);
        scope.setState({ offersList: list });
        scope.setState({ initialOffersList: list });
    }

    setFavorites(list, scope) {
        const filteredList = list.filter(offer => offer.savedOnAccount === auth.currentUser.email);
        scope.setState({ favoritesList: filteredList });
        scope.setState({ initialFavoritesList: filteredList });
    }

    setCurrentTab(id) {
        this.setState({ currentTab: id });
    }

    searchByName() {
        const input = document.getElementById("search-input");
        let search = input.value.toUpperCase();

        let offers = [...this.state.initialOffersList];
        let searchedOffers = offers.filter(offer => {
            if(offer.title.toUpperCase().indexOf(search) > -1) {
                return true;
            } 

            return false;
        });

        this.setState({ offersList: searchedOffers });

        let favs = [...this.state.initialFavoritesList];
        let searchedFavs = favs.filter(offer => {
            if(offer.title.toUpperCase().indexOf(search) > -1) {
                return true;
            } 

            return false;
        });

        this.setState({ favoritesList: searchedFavs });
    }

    render() {
        return (
            <div class="grid grid-cols-6 gap-0">
                <SideMenu setCurrentTab={this.setCurrentTab.bind(this)}/>
                <div className="card-list sm:col-span-4 col-span-6">
                    <SearchBar searchByName={this.searchByName} self={this}/>

                    {this.state.currentUser && this.state.currentUser.userType === 'I offer help' &&
                    <div className="add-wrapper">
                        <Link to="/offer" className="add-sign">Add offer</Link>
                    </div>}

                    {{
                        0:
                            <div className="cards-container grid grid-cols-2 gap-8">
                                {this.state.offersList.map(offer => {
                                    return <Card addNewSavedItem={this.addNewSavedItem} offer={offer}/>
                                })}
                            </div>,
                        1:
                            <div className="cards-container grid grid-cols-2 gap-8">
                                {this.state.offersList.map(offer => {
                                    if(offer.identifiers.find(id => id === '#transport')) {
                                        return <Card addNewSavedItem={this.addNewSavedItem} offer={offer}/>
                                    }
                                })}
                            </div>,
                        2:
                            <div className="cards-container grid grid-cols-2 gap-8">
                                {this.state.offersList.map(offer => {
                                    if(offer.identifiers.find(id => id === '#accommodation')) {
                                        return <Card addNewSavedItem={this.addNewSavedItem} offer={offer}/>
                                    }
                                })}
                            </div>,
                        3:
                            <div className="cards-container grid grid-cols-2 gap-8">
                                {this.state.offersList.map(offer => {
                                    if(offer.identifiers.find(id => id === '#food')) {
                                        return <Card addNewSavedItem={this.addNewSavedItem} offer={offer}/>
                                    }
                                })}
                            </div>,
                        4:
                            <div className="cards-container grid grid-cols-2 gap-8">
                                {this.state.offersList.map(offer => {
                                    if(offer.identifiers.find(id => id !== '#transport' && id !== '#food' && id !== '#accommodation')) {
                                        return <Card addNewSavedItem={this.addNewSavedItem} offer={offer}/>
                                    }
                                })}
                            </div>,
                        5:
                            <div className="cards-container lg:columns-2 gap-8">
                                {this.state.favoritesList.map(offer => {
                                    return <Card addNewSavedItem={this.addNewSavedItem} offer={offer}/>
                                })}
                            </div>
                    }[this.state.currentTab]} 
                </div>
            </div>
        )
    }
}

export default OffersList;