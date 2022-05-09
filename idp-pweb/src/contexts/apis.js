import { data } from "jquery";

const apiURL = 'http://localhost:7020';
const postOfferURL = apiURL + '/api/offers';
const postRequestURL = apiURL + '/api/requests';
const getOfferURL = apiURL + '/api/offers';
const getRequestURL = apiURL + '/api/requests';
const postFavoriteURL = apiURL + '/api/favorites';
const getFavoritesURL = apiURL + '/api/favorites';
const putOfferURL = apiURL + '/api/offers';
const putRequestURL = apiURL + '/api/requests';
const deleteFavoriteURL = apiURL + '/api/favorites';
const getOfferByIdURL = apiURL + '/api/offers';
const getRequestByIdURL = apiURL + '/api/requests';

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
export const getRequests = (success, scope) => {
    fetch(getRequestURL, {
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
export const postRequest = (requestData) => {
    fetch(postRequestURL, {
        method: 'post',
        body: JSON.stringify(requestData),
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

export const putOffer = (data, id) => {
    fetch(`${putOfferURL}/${id}`, {
        method: 'put',
        body: JSON.stringify(data),
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
export const putRequest = (data, id) => {
    fetch(`${putRequestURL}/${id}`, {
        method: 'put',
        body: JSON.stringify(data),
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

export const deleteFavorite = (id) => {
    fetch(`${deleteFavoriteURL}/${id}`, {
        method: 'delete',
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

export const getOfferById = (id, success, self) => {
    fetch(`${getOfferByIdURL}/${id}`, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(
        res => res.json()
    ).then( 
        data => {
            console.log(data)
            success(data, self);
        }
    )
    .catch(
        error => console.log(error)
    )
}
export const getRequestById = (id, success, self) => {
    fetch(`${getRequestByIdURL}/${id}`, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(
        res => res.json()
    ).then( 
        data => {
            console.log(data)
            success(data, self);
        }
    )
    .catch(
        error => console.log(error)
    )
}