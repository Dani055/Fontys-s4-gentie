import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { AppContext } from '../../StateProvider';
import QRImage from "../../images/qr.png"
import "./EventDetailsPage.css"
import Button from '@mui/material/Button';

function EventDetailsPage() {
    const { events, isElder } = useContext(AppContext)
    const params = useParams()
    const navigate = useNavigate()
    const [event, setEvent] = useState(null)

    useEffect(() => {
        let event = events.find(obj => obj.id == params.eventId)
    
        if(!event){
            navigate("/elder/home")
        }
        setEvent(event)
      }, []);

    return (
        <div className='container mt-5 px-4'>
            <div className='col-sm-6 mx-auto '>
                <p className="link-back pt-3" onClick={() => {navigate('/events')}}>← back to events</p>
                {event && <div className={`ticket ${isElder ? 'card-elder' : 'card-young'}`}>
                    <div class="holes-top"></div>
                    <div className='text-center'>
                        <h4>{event.name}</h4>
                        <h6>Show this at the entrance</h6>

                    </div>
                    <div className='qr my-4'>
                        <img src={QRImage}></img>
                    </div>
                    
                    <div className='row justify-content-between align-items-center'>
                        <div className='col-auto'><p className='m-0'>Event</p></div>
                        <div className='col-auto'><p className='m-0 fw-500'>{event.name}</p></div>
                    </div>
                    <div className='row mt-1 justify-content-between align-items-center'>
                        <div className='col-auto'><p className='m-0'>Date</p></div>
                        <div className='col-auto'><p className='m-0 fw-500'>{event.date}</p></div>
                    </div>
                    <div className='row mt-1 justify-content-between align-items-center'>
                        <div className='col-auto'><p className='m-0'>Time</p></div>
                        <div className='col-auto'><p className='m-0 fw-500'>14:00-18:00</p></div>
                    </div>
                    <div class="holes-bottom"></div>
                </div>
                }
                <div className='row mt-4'>
                    <div className='col-7 mx-auto'>
                        <Button className='rounded-pill' fullWidth variant='contained' >Save to gallery
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetailsPage;