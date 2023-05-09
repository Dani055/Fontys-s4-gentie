import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../../StateProvider';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import "./EventsPage.css"
import Button from '@mui/material/Button';

function EventsPage() {
    const { events, isElder } = useContext(AppContext)

    return (
        <div className='container mt-5 px-4'>
            <div className='col-sm-6 mx-auto '>
                <h5 className='text-center'>Events</h5>
                {events.map((event) => (
                    <div key={event.id} className={`mt-3 ${isElder ? 'card-elder' : 'card-young'}`}>
                        <div className='row justify-content-between align-items-center'>
                            <div className='col-auto'><h6 className='m-0 fw-600'>{event.name}</h6></div>
                            <div className='col-auto'><p className='m-0'><PeopleAltIcon color='primary' /> {event.participants}/{event.maxParticipants}</p></div>
                        </div>
                        <p className='fw-500 mt-2 mb-2'>Date: {event.date}</p>
                        <p className='fw-500 mb-2'>Location: {event.location}</p>
                        <p>{event.description}</p>
                        <div className='row mt-4'>
                            <div className='col-7 mx-auto'>
                                <Link to={"/events/" + event.id} className='mx-auto'>
                                    <Button className='rounded-pill' fullWidth variant='contained' >Join
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventsPage;