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
                <h2 className="text-center mb-4 text-xl">
                    <strong>Description</strong>
                </h2>
                
                <div className='info-div mt-4'>
                    <div className='section-div pt-4'>
                        <label className='more-info-label'><strong>Offer title:</strong></label>
                        <p className='more-info-section'>{currentOffer.title}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Provider email:</strong></label>
                        <p className='more-info-section'>{currentOffer.author}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Provider phone:</strong></label>
                        <p className='more-info-section'>{currentOffer.phone}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Offer subtitle:</strong></label>
                        <p className='more-info-section'>{currentOffer.subtitle}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Help location:</strong></label>
                        <p className='more-info-section'>{currentOffer.location}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Availability:</strong></label>
                        <p className='more-info-section'>{currentOffer.interval}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Description:</strong></label>
                        <p className='more-info-section'>{currentOffer.description}</p>
                    </div>
                </div>
            </div>}
        </div>
    );
}