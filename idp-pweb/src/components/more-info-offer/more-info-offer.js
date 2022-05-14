import React, {useState, useEffect} from 'react';
import './more-info-offer.css';
import moreInfoLogo from './more-info.svg';
import { getOfferById } from '../../contexts/apis';

export default function MoreInfoOffer(props){
    const [currentOffer, setCurrentOffer] = useState();

    useEffect(() => {
        getOfferById({id: props.match.params.id}, 
            successGetMoreInfo, failureGetMoreInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const successGetMoreInfo = (data) => {
        setCurrentOffer(data);
    }
    const failureGetMoreInfo = (error) => {
        console.log(error);
        setCurrentOffer();
    }

    const concatIdentifiers = () => currentOffer.identifiers.join(' ');

    return (
        <div>
            {currentOffer &&
            <div className='more-info-container'>
                <img src={moreInfoLogo} className='more-info-logo' alt='more-info-logo'/>
                <div className='info-div'>
                    <div className='section-div'>
                        <label className='more-info-label'>Title</label>
                        <p className='more-info-section'>{currentOffer.title}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'>Subtitle</label>
                        <p className='more-info-section'>{currentOffer.subtitle}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'>Location</label>
                        <p className='more-info-section'>{currentOffer.location}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'>Interval</label>
                        <p className='more-info-section'>{currentOffer.interval}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'>Description</label>
                        <p className='more-info-section'>{currentOffer.description}</p>
                    </div>
                    {currentOffer.identifiers &&
                    <div className='section-div'>
                        <label className='more-info-label'>Identifiers</label>
                        <p className='more-info-section'>{concatIdentifiers()}</p>
                    </div>}
                </div>
            </div>}
        </div>
    );
}