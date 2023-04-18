import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../../StateProvider';
import Button from '@mui/material/Button';

function Home(){
    const {requests, setRequests} = useContext(AppContext)

    const addr = () => {
        setRequests([...requests, {name:"Michael", description:"Help me carry a table pls"}])
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
    </div>
  );
}

export default Home;