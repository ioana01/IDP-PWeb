import React, {Component} from 'react';
import './more-info-offer.css';
import moreInfoLogo from './more-info.svg';
import { getOfferById } from '../../contexts/apis';

class MoreInfoOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId: this.props.match.params.id,
            currentOffer: {}
        }
    }

    componentDidMount() {
        getOfferById(this.state.currentId, this.setCurrentOffer, this);
    }

    setCurrentOffer(data, self) {
        self.setState({ currentOffer: data[0] });
    }

    concatIdentifiers() {
        let ident = '';

        this.state.currentOffer.identifiers.forEach(elem => {
            ident += elem;
            ident += " ";
        })

        return ident.trim();
    }

    render() {
        return (
            <>
            {this.state.currentOffer &&
            <div className='more-info-container'>
                <img src={moreInfoLogo} className='more-info-logo'></img>
                <div className='info-div'>
                    <div className='section-div'>
                        <label className='more-info-label'>Title</label>
                        <p className='more-info-section'>{this.state.currentOffer.title}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'>Subtitle</label>
                        <p className='more-info-section'>{this.state.currentOffer.subtitle}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'>Location</label>
                        <p className='more-info-section'>{this.state.currentOffer.location}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'>Interval</label>
                        <p className='more-info-section'>{this.state.currentOffer.interval}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'>Description</label>
                        <p className='more-info-section'>{this.state.currentOffer.description}</p>
                    </div>
                    {this.state.currentOffer.identifiers &&
                    <div className='section-div'>
                        <label className='more-info-label'>Identifiers</label>
                        <p className='more-info-section'>{this.concatIdentifiers()}</p>
                    </div>}
                </div>
            </div>}
            </>
        )
    }
}

export default MoreInfoOffer;