import { data } from "jquery";

const apiURL = 'http://localhost:7020';
const postOfferURL = apiURL + '/api/offers';
const getOfferURL = apiURL + '/api/offers';
const postFavoriteURL = apiURL + '/api/favorites';
const getFavoritesURL = apiURL + '/api/favorites';

export const getOffers = (success, scope) => {
    fetch(getOfferURL, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    }).then(
        res => res.json()
    ).then (
        data => {
            console.log(data);
            success(data, scope);
        }
    )
    .catch (
        error => console.log(error)
    )
}

export const postOffer = (offerData) => {
    fetch(postOfferURL, {
        method: 'post',
        body: JSON.stringify(offerData),
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        } 
    }).then(
        res => res.json()
    ).then(
        data => console.log(data)
    )
    .catch(
        error => console.log(error)
    )
}

export const postFavorite = (offerData) => {
    fetch(postFavoriteURL, {
        method: 'post',
        body: JSON.stringify(offerData),
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(
        res => res.json()
    ).then(
        data => console.log(data)
    )
    .catch(
        error => console.log(error)
    )
}

export const getFavorites = (success, scope) => {
    fetch(getFavoritesURL, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    }).then(
        res => res.json()
    ).then (
        data => {
            console.log(data);
            success(data, scope);
        }
    )
    .catch (
        error => console.log(error)
    )
}