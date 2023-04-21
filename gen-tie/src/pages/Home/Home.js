import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../../StateProvider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Home(){
    const {requests, setRequests} = useContext(AppContext)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const addr = () => {
        setRequests([...requests, {name, description}])
    }

  return (
    <div>
        <h3>Young</h3>
        <Button variant="contained" onClick={addr}>Add request</Button>
        {requests.map((req) => (
            <div>
            <p>{req.name}</p>
                <p>{req.description}</p>
            </div>
            
        ))}
        <TextField value={name} onChange={(event) => {
          setName(event.target.value);
        }} label="Name" variant="outlined" />
        <TextField value={description} onChange={(event) => {
          setDescription(event.target.value);
        }}label="Desription" variant="outlined" />
    </div>
  );
}

export default Home;