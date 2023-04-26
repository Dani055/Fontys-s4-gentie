import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../StateProvider';
import Button from '@mui/material/Button';

import "./LandingPage.css"

function LandingPage(){
    const {isElder, setIsElder, setLoggedUser, recipes} = useContext(AppContext)

    const navigate = useNavigate();



    const confirmYoung = () => {
        setIsElder(false)
        setLoggedUser({
          name: "Josh Sevens",
          picture: "https://media.licdn.com/dms/image/C5603AQF9V7rulvhcGw/profile-displayphoto-shrink_800_800/0/1648538863146?e=2147483647&v=beta&t=adF9VspgE-A8s_PnLvt8pjs3D6MpbZrcM5FQInUnvAA"
        })
        navigate("/young/home")
    };
    const confirmElder = () => {
        setIsElder(true)
        setLoggedUser({
          name: "Bold Boelaars",
          picture: "https://upload.wikimedia.org/wikipedia/commons/5/54/Angry_Grandpa_-_2015_%28cropped%29.jpg"
        })
        navigate("/elder/home")
    };


  return (  
    <div>
      <div className='media'>
        <img src=''></img>
      </div>
      <div className='container px-4 pt-4 '>
        <div className='col-sm-6 mx-auto'>
        <div className='text-center'>
          <h3 className='primary-color fw-600'>Welcome to GenTie</h3>
          <p>Tell us more about yourself</p>
        </div>

        <div onClick={() => confirmYoung()} className='row align-items-center bg-elder-light'>
          <div className='col-8'>
            <p className='m-1 text-center text-elder-primary'>I belong to the younger generation</p>
          </div>
          <div className='col-4 pb-2'>
            <div className='media'>
              <img src='/Millennial-pana.svg'></img>
            </div>
          </div>
        </div>

        <div onClick={() => confirmElder()} className='row align-items-center bg-elder-light mt-3'>
          <div className='col-8'>
            <p className='m-1 text-center text-elder-primary'>I belong to the senior generation</p>
          </div>
          <div className='col-4'>
            <div className='media pb-3'>
              <img src="/Grandma-pana.svg"></img>
            </div>
          </div>
        </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default LandingPage;