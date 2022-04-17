import React, {useState, useEffect} from 'react';
import profile from './undraw_profile.svg'
import AccountQuantityChange from './account-quantity-change';

export default function AccountSettings() {

    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [consentNotif, setConsentNotif] = useState(false);
    const [phone, setPhone] = useState();
    const [groupDescription, setGroupDescription] = useState({
        adults: 0,
        children: 0,
        elders: 0,
        pets: 0,
    });

    const groupTypes = {
        adults: 'adults',
        children: 'children',
        elders: 'elders',
        pets: 'pets',
    }

    const increaseButton = (groupType) => setGroupDescription({...groupDescription, 
        [groupType]: groupDescription[groupType] + 1});
    const decreaseButton = (groupType) => setGroupDescription({...groupDescription, 
        [groupType]: groupDescription[groupType] - 1 >= 0 ? groupDescription[groupType] -1 : 0});

    const updateProfile = () => {
        console.log('update profile');
    }

    const usernameChange = (value) => setUsername(value);
    const consentNotifChange = (value) => {
        setConsentNotif(value);
    }
    const emailChange = (value) => setEmail(value);
    const phoneChange = (value) => setPhone(value);
    
    useEffect(() => {
        setUsername('Stefan Popa');
        setConsentNotif(true);
        setEmail('andrei.popa2199@gmail.com');
        setPhone('074-895-908');
    }, []);


    return (
        <div className='flex flex-row items-center'>
            <div className='w-2/4 p-4'>
                <div className="text-xl font-bold mb-4 border-b-[1px] border-gray">
                    <span>Account Settings</span>
                    <div className="pb-4"></div>
                </div>
                <div className='mb-4 flex flex-col text-justify border-b-[1px] border-gray'>
                    <span className="font-bold">Name</span>
                    <div className='mt-2'>
                        <input className="rounded-md border-[1px] border-black pb-2 pl-2 w-full" type="text" id="username" name="username" placeholder='Username' value={username} onChange={(event) => usernameChange(event.currentTarget.value)}></input>
                    </div>
                    <span className="text-xs mt-2 pb-4">This is your full name that you could be associated with in a legal document. You should provide full first name and last name.  </span>
                </div>
                <div className='mb-4 flex flex-col text-justify mt-4 border-b-[1px] border-gray'>
                    <span className="font-bold">Email</span>
                    <div className='mt-2'>
                        <input className="rounded-md border-[1px] border-black pb-2 pl-2 w-full" type="text" id="email" name="email" placeholder='Email' value={email} onChange={(event) => emailChange(event.currentTarget.value)}></input>
                    </div>
                    <span className="text-xs mt-2">Email is important because we will send any notifications from this platform (new offers, requests etc.) for better alerting. Notifications will alert you in real-time about any postings or user interactions. </span>
                    <div className='pb-4 flex flex-row items-center mt-2'>
                        <input type="checkbox" checked={consentNotif} onChange={(event) => consentNotifChange(event.currentTarget.checked)}/>
                        <span className='ml-2 text-xs'>Consent if you want to be notified on email as well</span>
                    </div>
                </div>
                <div className='mb-4 flex flex-col text-justify mt-4 border-b-[1px] border-gray'>
                    <span className="font-bold">Phone</span>
                    <div className='mt-2'>
                        <input className="rounded-md border-[1px] border-black pb-2 pl-2 w-full" type="phone" id="phone" name="phone" placeholder='Phone' value={phone} onChange={(event) => phoneChange(event.currentTarget.value)}></input>
                    </div>
                    <span className="text-xs mt-2 pb-4">Phone number is important because you might be contacted by other users. </span>
                </div>
                <div className="mt-4 flex flex-col text-justify">
                    <span className="font-bold">Group description (this section applies in case of refugees) </span>
                    <div className='pb-2'>
                        <div className='flex flex-row justify-between mt-1'>
                            <span className="mr-2">Adults (18-65)</span>
                            <AccountQuantityChange 
                                groupType={groupTypes.adults}
                                groupValue={groupDescription.adults} 
                                decreaseButton={decreaseButton} 
                                increaseButton={increaseButton}/>
                        </div>
                        <div className='flex flex-row justify-between mt-1'>
                            <span className="mr-2">Children ({"<"} 18)</span>
                            <AccountQuantityChange 
                                groupType={groupTypes.children}
                                groupValue={groupDescription.children} 
                                decreaseButton={decreaseButton}
                                increaseButton={increaseButton}/>
                        </div>
                        <div className='flex flex-row justify-between mt-1'>
                            <span className="mr-2">Elders ({">"} 65)</span>
                            <AccountQuantityChange
                                groupType={groupTypes.elders}
                                groupValue={groupDescription.elders}
                                decreaseButton={decreaseButton}
                                increaseButton={increaseButton}/>
                        </div>
                        <div className='flex flex-row justify-between mt-1'>
                            <span className="mr-2">Pets</span>
                            <AccountQuantityChange
                                groupType={groupTypes.pets}
                                groupValue={groupDescription.pets}
                                decreaseButton={decreaseButton}
                                increaseButton={increaseButton}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-2/4 h-full flex flex-col items-center'>
                <img src={profile} alt="profile" className="w-96 mb-4"/>
                <div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' onClick={updateProfile}>Submit</button>
                </div>
            </div>
        </div>
    )
}