import React, {useState, useEffect} from 'react';
import './request-form.css';

export default function RequestForm() {

    const [requestTile, setRequestTitle] = useState("");
    const [requestSubtitle, setRequestSubtitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [identifiers, setIdentifiers] = useState([]);
    const [identifierText, setIdentifierText] = useState("");

    const addIdentifier  = (event) => {
        if(event.keyCode === 13) {
            console.log('identifier');
            if (!identifier) return;
            setIdentifiers([...identifiers, identifier]);
        }
    }

    useEffect(() => {
        setIdentifier('');
        setIdentifierText(identifiers.join(' '));
    }, [identifiers]);

    const submitRequest = () => console.log("Submit request");

    return (
            <div className="flex flex-col request-container p-4 items-center">
                <div className="text-2xl font-bold mb-4 text-center">
                    <span>Create a help request</span>
                </div>
                <div className='mb-4 mt-2 sm:w-full md:w-3/4 text-sm md:text-base'>
                    <input className="rounded-md border-[1px] border-black pb-2 pl-2 w-full request-form-input" type="text" id="username" name="username" placeholder='Request title: e.g. Need Accomodation - Galati or Braila county' value={requestTile} onChange={(event) => setRequestTitle(event.currentTarget.value)}></input>
                </div>
                <div className='mb-4 mt-2 sm:w-full md:w-3/4 text-sm md:text-base'>
                    <input className="rounded-md border-[1px] border-black pb-2 pl-2 w-full request-form-input" type="text" id="username" name="username" placeholder='Request subtitle: e.g. Adult and two children need accomodation' value={requestSubtitle} onChange={(event) => setRequestSubtitle(event.currentTarget.value)}></input>
                </div>
                <div className='mb-4 mt-2 sm:w-full md:w-3/4 text-sm md:text-base'>
                    <input className="rounded-md border-[1px] border-black pb-2 pl-2 w-full request-form-input" type="text" id="username" name="username" placeholder='Location: e.g. Galati - Isaccea' value={location} onChange={(event) => setLocation(event.currentTarget.value)}></input>
                </div>
                <div className='mb-4 mt-2 sm:w-full md:w-3/4 text-sm md:text-base'>
                    <textarea className="rounded-md border-[1px] border-black pb-2 pl-2 w-full request-form-input" type="text" id="username" name="username" placeholder='Request description and additional information' value={description} onChange={(event) => setDescription(event.currentTarget.value)}></textarea>
                </div>
                <div className="sm:w-full md:w-3/4 text-sm md:text-base">
                    <input className="request-identifiers-input w-full" name='identifier' id='identifier' placeholder="Identifiers (ex. #food)" value={identifier} onChange={(event) => setIdentifier(event.currentTarget.value)} onKeyUp={(event) => addIdentifier(event)}></input>
                    <textarea id='list' className="request-identifiers-text w-full" name="list" readOnly cols="40" rows="5" value={identifierText}></textarea>
                </div>
                <div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' onClick={submitRequest}>Submit</button>
                </div>
        </div>
    );
}