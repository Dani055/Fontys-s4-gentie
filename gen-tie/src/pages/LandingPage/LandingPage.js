import React, {useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../StateProvider';
import Button from '@mui/material/Button';

function LandingPage(){
    const {isElder, setIsElder} = useContext(AppContext)
    const navigate = useNavigate();

    const confirmYoung = () => {
        setIsElder(false)
        navigate("/young/home")
    };
    const confirmElder = () => {
        setIsElder(true)
        navigate("/elder/home")
    };

  return (
    <div>
        <Button variant="contained" onClick={confirmYoung}>Young</Button>
        <Button variant="outlined" onClick={confirmElder}>Elder</Button>
    </div>
  );
}

export default LandingPage;