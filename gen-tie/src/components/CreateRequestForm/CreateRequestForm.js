import React, { useState, useEffect, useContext } from "react";
import { AppContext } from '../../StateProvider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function CreateRequestForm(props) {
    const { requests, setRequests, loggedUser } = useContext(AppContext)
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [name, setName] = useState("")
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
        setRequests([...requests, { user:  loggedUser , description, latitude: location.latitude, longitude: location.longitude }])
    }

    return (
        <div className='container mt-4'>
            <div className='col-sm-6 mx-auto'>
                <Button variant="contained" onClick={addr}>Add request</Button>
                <TextField value={name} onChange={(event) => {
                    setName(event.target.value);
                }} label="Name" variant="outlined" />
                <TextField value={description} onChange={(event) => {
                    setDescription(event.target.value);
                }} label="Desription" variant="outlined" />
            </div>
        </div>
    );
}

export default CreateRequestForm;
