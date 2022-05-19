import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideMenu from "../side-menu/side-menu";
import SearchBar from "../search-bar/search-bar";
import OfferCard from "../offer-card/offer-card";
import { 
    getOffers, 
    getFavorites,
    postFavorite,
    deleteFavorite,
    getProfile } from '../../contexts/apis';
import './offers-list.css';


export default function OffersList(){
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const [offersList, setOffersList] = useState([]);
    const [profile, setProfile] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [currentTab, setCurrentTab] = useState('');
    const [filteredOffers, setFilteredOffers] = useState([]);

    useEffect(() => {
        getProfile({email: email}, token, successGetProfile, failureGetProfile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (profile === null) return;

        let offers = [];

        const successGetOffers = (offersData) => {
            offers = offersData;
            getFavorites(token, successGetFavorites, failureGetFavorites);
        };
        const failureGetOffers = (error) => {
            console.log(error);
            setOffersList([]);
        };
        const successGetFavorites = (favoritesData) => {
            offers = offers.map(offer => {
                const favorite = favoritesData.find(favorite => favorite.postId === offer.id);
                return { ...offer, favorite: !favorite ? false : true };
            });
            setOffersList(offers);
        };
        const failureGetFavorites = (error) => {
            console.log(error);
            setOffersList([]);
        };

        getOffers(token, successGetOffers, failureGetOffers);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);
    
    const successGetProfile = (data) => {
        setProfile(data);
    }
    const failureGetProfile = (error) => {
        console.log(error);
        setProfile(null);
    }

    const changeCurrentTab = (identifier) => {
        setCurrentTab(identifier);
    }

    const bookmarkPost = (offer) => {
        const successBookmark = () => {
            const oldOffers = offersList;
            const newOffers = oldOffers.map(oldOffer => {
                if (oldOffer.id === offer.id) {
                    return { ...oldOffer, favorite: !oldOffer.favorite };
                }
                return oldOffer;
            });
            setOffersList(newOffers);
        }
        const failureBookmark = (error) => {
            console.log(error);
        }

        (offer.favorite === true)
            ? deleteFavorite({postId: offer.id, profileId: profile.id}, token, successBookmark, failureBookmark)
            : postFavorite({postId: offer.id, profileId: profile.id}, token, successBookmark, failureBookmark);
    }

    const filterOffersSearch = (searchText, identifier) => {
        if (offersList == null || offersList < 1)
            return [];

        identifier = identifier.trim();
        searchText = searchText.trim();

        const filteredByIdentifier = (identifier !== null && identifier !== '') 
            ? offersList.filter(offer => offer.identifiers.includes(identifier)) 
            : offersList;

        const finalFiltered = (searchText !== null && searchText !== '') 
            ? filteredByIdentifier.filter(offer => offer.title.toUpperCase().includes(searchText.toUpperCase())) 
            : filteredByIdentifier;
        
        setFilteredOffers(finalFiltered);
    }

    useEffect(() => {
        if (offersList === null || offersList.length < 1) return;
        filterOffersSearch(searchText, currentTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offersList, currentTab, searchText]);

    return (
        <div className="grid grid-cols-6 gap-0">
            <SideMenu
                profile={profile}
                list="offers"
                setCurrentTab={changeCurrentTab}
                />
            <div className="card-list sm:col-span-4 col-span-6">
                <SearchBar
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}/>

                <div className="cards-container grid grid-cols-2 gap-8">
                    {
                        filteredOffers.length > 0 && filteredOffers.map(offer => {
                            return <OfferCard bookmarkPost={bookmarkPost} offer={offer} key={offer.id}/>
                    })}
                    {
                        !filteredOffers.length &&
                            <span>No offers to be displayed...</span>
                    }
                </div>
            </div>
        </div>
    );
};