import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../../StateProvider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import './Home.css'

function Home(){
    const {requests, setRequests, loggedUser} = useContext(AppContext)
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
        setRequests([...requests, {user:{name}, description, latitude: location.latitude, longitude: location.longitude}])
    }
    const applyForRequest = (req) => {
      let newRequests = [...requests] 
      let request = newRequests.find(obj => obj.id === req.id)
      request.helper = loggedUser
      console.log(newRequests)
      setRequests(newRequests)
    }
  return (
    <div className='home'>
      <div>
        <h3>Hello, {loggedUser?.name}</h3>

        {location.latitude && location.longitude ? (
          <>
            <MapContainer center={[location.latitude, location.longitude]} zoom={13} style={{ height: '400px', width: '80%', margin: "3em auto" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {requests.map((req) => (
                <Marker icon={redMarker} position={[req.latitude, req.longitude]}>
                  <Popup>
                    <h6>{req.user.name}</h6>
                    <p>{req.description}</p>
                    {req.helper === undefined ? <Button variant="contained" onClick={() => {applyForRequest(req)}}>Apply for help</Button> : <p>Helper: {req.helper.name}</p>}
                  </Popup>
                </Marker>
              ))}
              <Marker position={[location.latitude, location.longitude]}>

                <Popup>
                  Your location</Popup>
              </Marker>
            </MapContainer>
          </>
        ) : (
          <div>Loading location...</div>
        )}

        <Button variant="contained" onClick={addr}>Add request</Button>
        <TextField value={name} onChange={(event) => {
          setName(event.target.value);
        }} label="Name" variant="outlined" />
        <TextField value={description} onChange={(event) => {
          setDescription(event.target.value);
        }} label="Desription" variant="outlined" />
      </div>

      <div className='send-msg p-2'>
        <IconButton aria-label="send" color="primary" onClick={addr}><SendIcon /></IconButton>
        <TextField label="message" size="small" fullWidth variant="outlined" />
      </div>
    </div>
  );
}

export default Home;