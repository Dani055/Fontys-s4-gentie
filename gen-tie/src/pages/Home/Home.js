import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../StateProvider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import './Home.css'

function Home() {
  const { requests, setRequests, loggedUser } = useContext(AppContext)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const redMarker = new Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  });

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
    setRequests([...requests, { user: { name }, description, latitude: location.latitude, longitude: location.longitude }])
  }

  const sendNotifications = (req) => {
    const title = 'Applied for help';
    const options = {
      body: `You have successfully volunteered to help ${req.user.name}`,
      icon: '/logo192.png'
    };
    new Notification(title, options);
  };

  const applyForRequest = (req) => {
    let newRequests = [...requests]
    let request = newRequests.find(obj => obj.id === req.id)
    request.volunteer = loggedUser

    setRequests(newRequests)
    sendNotifications(req);
  }
  return (
    <div className='home'>
      <div>
        {location.latitude && location.longitude ? (
          <>
            <MapContainer center={[location.latitude, location.longitude]} zoom={13} style={{ height: '100vh', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {requests.map((req) => (
                <Marker key={req.id} icon={redMarker} position={[req.latitude, req.longitude]}>
                  <Popup className='rounded-circle'>
                    <div className='text-center p-2'>
                      <div className='row align-items-center g-0'>
                        <div className='col-4 media'>
                          <img className='rounded' src={req.user.picture}></img>
                        </div>
                        <div className='col-8 ps-3'>
                          <h6 className='text-young-primary m-0 pb-1'>{req.user.name}</h6>
                          <p className='m-0 mt-1'><LocalPhoneIcon fontSize='small' color='primary'></LocalPhoneIcon>{req.user.phone}</p>
                        </div>
                      </div>
                      <p><span className='text-young-primary'>Task type: </span>{req.type}</p>
                      <p><span className='text-young-primary'>Benefits </span>{req.benefit}</p>
                      {req.volunteer === undefined ? <p>{req.description}</p> : null}

                      {req.volunteer === undefined ? <Button fullWidth variant="contained" className='rounded-pill' onClick={() => { applyForRequest(req) }}>Apply for help</Button> :
                        <p className='m-0'><span className='text-young-primary'>Volunteer </span> {req.volunteer.name}</p>
                      }
                    </div>
                  </Popup>
                </Marker>
              ))}
              <Marker position={[location.latitude, location.longitude]}>
                <Popup>
                  <p className='pe-4'>
                    Your location
                  </p>
                </Popup>
              </Marker>
            </MapContainer>
          </>
        ) : (
          <div>Loading location...</div>
        )}

        {/* <Button variant="contained" onClick={addr}>Add request</Button>
        <TextField value={name} onChange={(event) => {
          setName(event.target.value);
        }} label="Name" variant="outlined" />
        <TextField value={description} onChange={(event) => {
          setDescription(event.target.value);
        }} label="Desription" variant="outlined" /> */}
      </div>

      {/* <div className='send-msg p-2'>
        <IconButton aria-label="send" color="primary" onClick={addr}><SendIcon /></IconButton>
        <TextField label="message" size="small" fullWidth variant="outlined" />
      </div> */}
    </div>
  );
}

export default Home;