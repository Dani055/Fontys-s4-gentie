import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../StateProvider';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import EventIcon from '@mui/icons-material/Event';
import ImageIcon from '@mui/icons-material/Image';

function NavBar() {
  const {isElder} = useContext(AppContext)
  let navigate = useNavigate()
  const location = useLocation();
  const [value, setValue] = useState("/");

  useEffect(() => {
    setValue(location.pathname)
  },[location.pathname])

  const navbarStyle = {
    position: 'fixed',
    bottom: 30,
    width: '100%',
    borderRadius: 30,
    zIndex: 99
  };

  

  return (
    <BottomNavigation
        showLabels
        value={value}
        sx={navbarStyle}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue)
        }}
      >
        {isElder ? <BottomNavigationAction label="Home" value="/elder/home" icon={<HomeIcon />}/> : <BottomNavigationAction label="Home" value="/young/home" icon={<HomeIcon />} />}
        <BottomNavigationAction label="Events" value="/events" icon={<EventIcon />} />
        <BottomNavigationAction label="Nana's kitchen" value="/recipes" icon={<SoupKitchenIcon />} />
        <BottomNavigationAction label="Gallery" value="/gallery" icon={<ImageIcon />} />
      </BottomNavigation>
  );
}

export default NavBar;
