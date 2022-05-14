import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { postFavorite, putOffer, deleteFavorite } from '../../contexts/apis';
import { auth } from "../../firebase";
import './card.css';

export default function Card({ bookmarkPost, offer }) {
    // constructor(props) {
    //     super(props);
    //     const isFav = props.offer.favorite === 'true' ? 'fa-bookmark' : 'fa-bookmark-o';

    //     this.state = {
    //         status: isFav,
    //         cardId: ''
    //     }
    // }

    const saveCard = () => {
        // const newStatus = this.state.status === 'fa-bookmark-o' ? 'fa-bookmark' : 'fa-bookmark-o';
        // this.setState({ status: newStatus });
    
        // if(newStatus === 'fa-bookmark') {
        //     const savedOffer = {...this.props.offer, savedOnAccount: auth.currentUser.email};
        //     postFavorite(savedOffer);
        //     putOffer({favorite: "true"}, this.props.offer.id);
        // } else {
        //     putOffer({favorite: "false"}, this.props.offer.id);
        //     deleteFavorite(this.props.offer.id);
        // }
    }

    return (
        <div className="card-container">
            { offer && 
                <div className=" rounded overflow-hidden shadow-lg">
                    <div className="px-6 info-section-card">
                        <div className="font-bold text-xl mb-2 card-title">
                            <div>
                                <h1 className="card-title-h1">{offer.title}</h1>
                                <h2 className="card-title-h2">{offer.subtitle}</h2>
                            </div>
                            <span className="cursor-pointer">
                                {
                                    offer.favorite === true
                                    ? <i className="fa fa-bookmark" onClick={() => bookmarkPost(offer)}></i>
                                    : <i className="fa fa-bookmark-o" onClick={() => bookmarkPost(offer)}></i>
                                }
                            </span>
                        </div>
                        <div className="card-section">
                            <i className="fa fa-map-marker"></i>
                            <p>{offer.location}</p>
                        </div>
                        <div className="card-section">
                            <i className="fa fa-clock-o"></i>
                            <p>{offer.interval}</p>
                        </div>
                    </div>
                    <div className="px-6 pt-4 pb-2 identifiers-list">
                        {offer.identifiers.map(identifier => {
                            return <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={identifier}>{identifier}</span>
                        })}
                    </div>
                    
                    <div className="pb-2 link-card-container">
                        <Link className="px-6 pb-2 more-info-btn" to={{pathname: `/more-info/offer/${offer.id}`}}> More info </Link>
                    </div>
                </div> 
            }
        </div>
    );
}