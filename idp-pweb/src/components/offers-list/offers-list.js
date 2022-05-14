import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideMenu from "../side-menu/side-menu";
import SearchBar from "../search-bar/search-bar";
import Card from "../card/card";
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

    const [offersContent, setOffersContent] = useState({
        offers: [],
        favorites: [],
    });
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
        let favorites = [];  

        const successGetOffers = (offersData) => {
            offers = offersData;
            getFavorites(token, successGetFavorites, failureGetFavorites);
        };
        const failureGetOffers = (error) => {
            console.log(error);
            setOffersContent({ offers: [], favorites: [] });
        };
        const successGetFavorites = (favoritesData) => {
            favorites = favoritesData;
            offers = offers.map(offer => {
                const favorite = favoritesData.find(favorite => favorite.postId === offer.id);
                return { ...offer, favorite: !favorite ? false : true };
            });
            setOffersContent({ offers: offers, favorites: favorites });
        };
        const failureGetFavorites = (error) => {
            console.log(error);
            setOffersContent({ offers: [], favorites: [] });
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
            const oldOffers = offersContent.offers;
            const newOffers = oldOffers.map(oldOffer => {
                if (oldOffer.id === offer.id) {
                    return { ...oldOffer, favorite: !oldOffer.favorite };
                }
                return oldOffer;
            });
            const oldFavorite = offersContent.favorites;
            const newFavorite = oldFavorite.map(oldFavorite => {
                if (oldFavorite.postId === offer.id) {
                    return { ...oldFavorite, favorite: !oldFavorite.favorite };
                }
                return oldFavorite;
            });
            setOffersContent({ offers: newOffers, favorites: newFavorite });
        }
        const failureBookmark = (error) => {
            console.log(error);
        }

        (offer.favorite === true)
            ? deleteFavorite({postId: offer.id, profileId: profile.id}, token, successBookmark, failureBookmark)
            : postFavorite({postId: offer.id, profileId: profile.id}, token, successBookmark, failureBookmark);
    }

    const filterOffersSearch = (searchText, identifier) => {
        if (offersContent.offers == null || offersContent.offers.length < 1)
            return [];

        identifier = identifier.trim();
        searchText = searchText.trim();

        const filteredByIdentifier = (identifier !== null && identifier !== '') ? 
            offersContent.offers.filter(offer => 
                offer.identifiers.includes(identifier)) : offersContent.offers;

        const finalFiltered = (searchText !== null && searchText !== '') ? 
            filteredByIdentifier.filter(offer => 
                offer.title.toUpperCase().includes(searchText.toUpperCase())) : filteredByIdentifier;
        
        setFilteredOffers(finalFiltered);
    }

    useEffect(() => {
        if (offersContent.offers === null || offersContent.offers.length < 1) return;
        filterOffersSearch(searchText, currentTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offersContent.offers, currentTab, searchText]);

    return (
        <div className="grid grid-cols-6 gap-0">
            <SideMenu setCurrentTab={changeCurrentTab}/>
            <div className="card-list sm:col-span-4 col-span-6">
                <SearchBar
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}/>

                {profile && profile.userType === 'provider' &&
                <div className="add-wrapper">
                    <Link to="/offer" className="add-sign">Add offer</Link>
                </div>}
                <div className="cards-container grid grid-cols-2 gap-8">
                    {
                        filteredOffers.length > 0 && filteredOffers.map(offer => {
                            return <Card bookmarkPost={bookmarkPost} offer={offer} key={offer.id}/>
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