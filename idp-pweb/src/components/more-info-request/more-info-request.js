import React, {useState, useEffect} from 'react';
import './more-info-request.css';
import moreInfoLogo from './more-info.svg';
import { getRequestById } from '../../contexts/apis';

export default function MoreInfoOffer(props){
    const [currentRequest, setCurrentRequest] = useState();

    useEffect(() => {
        getRequestById({id: props.match.params.id}, 
            successGetMoreInfo, failureGetMoreInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const successGetMoreInfo = (data) => {
        setCurrentRequest(data);
    }
    const failureGetMoreInfo = (error) => {
        console.log(error);
        setCurrentRequest();
    }

    const concatIdentifiers = () => currentRequest.identifiers.join(' ');

    return (
        <div>
            {currentRequest &&
            <div className='more-info-container'>
                <img src={moreInfoLogo} className='more-info-logo' alt='more-info-logo'/>
                <div className='info-div'>
                    <div className='section-div'>
                        <label className='more-info-label'>Title</label>
                        <p className='more-info-section'>{currentRequest.title}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'>Subtitle</label>
                        <p className='more-info-section'>{currentRequest.subtitle}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'>Location</label>
                        <p className='more-info-section'>{currentRequest.location}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'>Description</label>
                        <p className='more-info-section'>{currentRequest.description}</p>
                    </div>
                    {currentRequest.identifiers &&
                    <div className='section-div'>
                        <label className='more-info-label'>Identifiers</label>
                        <p className='more-info-section'>{concatIdentifiers()}</p>
                    </div>}
                </div>
            </div>}
        </div>
    );
}