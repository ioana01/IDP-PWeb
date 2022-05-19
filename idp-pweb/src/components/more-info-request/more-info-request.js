import React, {useState, useEffect} from 'react';
import './more-info-request.css';
import moreInfoLogo from './more-info.svg';
import { getProfile, getRequestById } from '../../contexts/apis';

export default function MoreInfoOffer(props){

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const [profile, setProfile] = useState(null);
    const [currentRequest, setCurrentRequest] = useState();

    useEffect(() => {
        getRequestById({id: props.match.params.id}, 
            successGetMoreInfo, failureGetMoreInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getProfile({email: email}, token, successGetProfile, failureGetProfile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const successGetProfile = (data) => {
        setProfile(data);
    }
    const failureGetProfile = (error) => {
        console.log(error);
        setProfile(null);
    }

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
                <h2 className="text-center mb-4 text-xl">
                    <strong>Description</strong>
                </h2>
                

                <div className='info-div'>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Request title:</strong></label>
                        <p className='more-info-section'>{currentRequest.title}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Request subtitle:</strong></label>
                        <p className='more-info-section'>{currentRequest.subtitle}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Contact email:</strong></label>
                        <p className='more-info-section'>{currentRequest.author}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Contact phone:</strong></label>
                        <p className='more-info-section'>{currentRequest.phone}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Help location:</strong></label>
                        <p className='more-info-section'>{currentRequest.location}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Description:</strong></label>
                        <p className='more-info-section'>{currentRequest.description}</p>
                    </div>
                    <div className='section-div'>
                        <label className='more-info-label'><strong>Group:</strong></label>
                        <p className='more-info-section'>{currentRequest.group}</p>
                    </div>
                </div>
            </div>}
        </div>
    );
}