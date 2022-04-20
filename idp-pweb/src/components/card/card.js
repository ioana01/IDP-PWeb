import React, {Component} from "react";
import { Link } from "react-router-dom";
import './card.css';
import { postFavorite, putOffer, deleteFavorite } from '../../contexts/apis';
import { auth } from "../../firebase";
class Card extends Component {
    constructor(props) {
        super(props);
        const isFav = props.offer.favorite === 'true' ? 'fa-bookmark' : 'fa-bookmark-o';

        this.state = {
            status: isFav,
            cardId: ''
        }
    }

    saveCard() {
        const newStatus = this.state.status === 'fa-bookmark-o' ? 'fa-bookmark' : 'fa-bookmark-o';
        this.setState({ status: newStatus });
    
        if(newStatus === 'fa-bookmark') {
            const savedOffer = {...this.props.offer, savedOnAccount: auth.currentUser.email};
            postFavorite(savedOffer);
            putOffer({favorite: "true"}, this.props.offer.id);
        } else {
            putOffer({favorite: "false"}, this.props.offer.id);
            deleteFavorite(this.props.offer.id);
        }
    }

    render() {
        return (
            <div className="card-container">

                <div className=" rounded overflow-hidden shadow-lg">
                    <div className="px-6 info-section-card">
                        <div className="font-bold text-xl mb-2 card-title">
                            <div>
                                <h1 className="card-title-h1">{this.props.offer.title}</h1>
                                <h2 className="card-title-h2">{this.props.offer.subtitle}</h2>
                            </div>
                            <i className={"save-icon fa " + this.state.status} aria-hidden="true" onClick={this.saveCard.bind(this)}></i>
                        </div>
                        <div class="card-section">
                            <i class="fa fa-map-marker"></i>
                            <p>{this.props.offer.location}</p>
                        </div>
                        <div class="card-section">
                            <i class="fa fa-clock-o"></i>
                            <p>{this.props.offer.interval}</p>
                        </div>
                    </div>
                    <div class="px-6 pt-4 pb-2 identifiers-list">
                        {this.props.offer.identifiers.map(identifier => {
                            return <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{identifier}</span>
                        })}
                    </div>
                    
                    <div className="pb-2 link-card-container">
                        <Link className="px-6 pb-2 more-info-btn" to={{pathname: `/more-info/offer/${this.props.offer.id}`}}> More info </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;