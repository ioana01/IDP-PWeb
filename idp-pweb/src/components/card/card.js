import React, {Component} from "react";
import './card.css';

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'fa-bookmark-o',
            cardId: ''
        }
    }

    saveCard() {
        const newStatus = this.state.status === 'fa-bookmark-o' ? 'fa-bookmark' : 'fa-bookmark-o';
        this.setState({ status: newStatus });
        this.props.addNewSavedItem(this.state.id);
    }

    render() {
        return (
            <div className="card-container">
                <div class=" rounded overflow-hidden shadow-lg">
                    {/* <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"/> */}
                    <div class="px-6 info-section-card">
                        <div class="font-bold text-xl mb-2 card-title">
                            {/* <p>Title</p> */}
                            <div>
                                <h1 className="card-title-h1">Title</h1>
                                <h2>Subtitle</h2>
                            </div>
                            <i class={"save-icon fa " + this.state.status} aria-hidden="true" onClick={this.saveCard.bind(this)}></i>
                        </div>
                        <div class="card-section">
                            <i class="fa fa-map-marker"></i>
                            <p>Location</p>
                        </div>
                        <div class="card-section">
                            <i class="fa fa-clock-o"></i>
                            <p>Interval</p>
                        </div>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#food</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#transport</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#clothes</span>
                    </div>
                    <button className="px-6 pb-2 more-info-btn">More info</button>
                </div>
            </div>
        )
    }
}

export default Card;