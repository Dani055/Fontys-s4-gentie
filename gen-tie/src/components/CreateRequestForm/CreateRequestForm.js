import React, { useState, useEffect, useContext } from "react";
import { AppContext } from '../../StateProvider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import GardeningImage from "../../images/gardening.svg"
import GroceriesImage from "../../images/groceries.svg"
import CleaningImage from "../../images/cleaning.svg"
import LaundryImage from "../../images/laundry.svg"
import RepairsImage from "../../images/repairs.svg"
import TransportImage from "../../images/transport.svg"
import "./CreateRequestForm.css"
import { TextareaAutosize } from "@mui/material";

function CreateRequestForm(props) {
    const { requests, setRequests, loggedUser } = useContext(AppContext)
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    const [selectedType, setSelectedType] = useState(null)
    const [benefit, setBenefit] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.log('User denied the request for Geolocation.');
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.log('Location information is unavailable.');
                            break;
                        case error.TIMEOUT:
                            console.log('The request to get user location timed out.');
                            break;
                        default:
                            console.log('An unknown error occurred.');
                            break;
                    }
                }
            );
        } else {
            console.log('Geolocation is not supported');
        }
    }, []);

    const addr = () => {
        setRequests([...requests, { user: loggedUser, type: selectedType, benefit, description, latitude: location.latitude, longitude: location.longitude }])
    }
    const changeRequestType = (type) => {
        setSelectedType(type)
    }

    return (
        <>
        {!selectedType && <>
            <h4>Hello, {loggedUser.name}</h4>
            <p>What do you need help with?</p>
            <div className="row gy-4 text-center">
                <div onClick={() => changeRequestType("Gardening")} className="col-6">
                    <div className="request-type-card p-3">
                        <div className="media ">
                            <img src={GardeningImage}></img>
                        </div>
                        <h5>Gardening</h5>
                    </div>
    
                </div>
                <div onClick={() => changeRequestType("Cleaning")} className="col-6">
                    <div className="request-type-card p-3">
                        <div className="media ">
                            <img src={CleaningImage}></img>
                        </div>
                        <h5>Cleaning</h5>
                    </div>
                </div>
                <div onClick={() => changeRequestType("Groceries")} className="col-6">
                    <div className="request-type-card p-3">
                        <div className="media ">
                            <img src={GroceriesImage}></img>
                        </div>
                        <h5>Groceries</h5>
                    </div>
                </div>
                <div onClick={() => changeRequestType("Laundry")} className="col-6">
                    <div className="request-type-card p-3">
                        <div className="media ">
                            <img src={LaundryImage}></img>
                        </div>
                        <h5>Laundry</h5>
                    </div>
                </div>
                <div onClick={() => changeRequestType("Repairs")} className="col-6">
                    <div className="request-type-card p-3">
                        <div className="media ">
                            <img src={RepairsImage}></img>
                        </div>
                        <h5 className="mb-0 mt-2">Repairs</h5>
                    </div>
                </div>
                <div onClick={() => changeRequestType("Transport")} className="col-6">
                    <div className="request-type-card p-3">
                        <div className="media ">
                            <img src={TransportImage}></img>
                        </div>
                        <h5>Transport</h5>
                    </div>
                </div>
            </div>
            </>}
            {selectedType && 
                <>
                <p className="m-0">Requesting help with:</p>
                <h5 className="text-elder-primary">Groceries</h5>
                <p className="link-back text-black-50" onClick={() => {setSelectedType(null)}}>← back to categories</p>
                <div>
                    <h5>Select date</h5>
                    <DatePicker fullWidth label="DD/MM/YYYY" slotProps={{ textField: { fullWidth: true } }} />

                    <h5 className="mt-3">Benefits for volunteer</h5>
                    <TextField value={benefit} fullWidth onChange={(event) => {
                        setBenefit(event.target.value);
                    }} label="E.g teach a skill" variant="outlined" />

                    <h5 className="mt-3">Description</h5>
                    <TextareaAutosize
                        className="w-100 p-3 textarea"
                        aria-label="ingredients"
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                        placeholder="Describe your task"
                        minRows={5}
                    />
                </div>
                <div className='row mt-4'>
                    <div className='col-5 mx-auto'>
                            <Button className='rounded-pill' onClick={addr} fullWidth variant='contained' >Add request
                            </Button>
                    </div>
                </div>
                </>
            }

            </>
    );
}

export default CreateRequestForm;
