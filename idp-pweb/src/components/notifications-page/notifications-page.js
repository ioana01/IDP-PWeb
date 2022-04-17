import React from 'react';
import { notifications } from './mock-notifications';

export default function NotificationsPage() {
    return (
        <div className='p-4'>
            <div className='text-xl font-bold border-b-[1px] border-gray'>
                <span>Notifications</span>
                <div className='pb-2'></div>
            </div>
            {
                notifications.map((notification, index) => {
                    return (
                        <div className='text-justify border-b-[1px] border-gray pt-1' key={index}>
                            <div>User: 
                                <span className="font-bold ml-1">{notification.user}</span> has 
                                <span>{notification.action}: </span>
                                <span className='font-bold'>{notification.details}</span>
                            </div>
                            <div>
                                <span>Email: </span>
                                <span className='font-bold'>{notification.email}</span>
                                <span>Phone: </span>
                                <span className='font-bold'>{notification.phone}</span>
                            </div>
                            <div className='pb-4'>
                                <span className='mr-2'>Go to:</span>
                                <span className='decoration-sky-500'>Post Details</span>
                            </div>
                        </div>
                    )
                }
                )
            }
        </div>
    )
}