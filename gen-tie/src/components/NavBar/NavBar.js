import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Battery2BarIcon from '@mui/icons-material/Battery2Bar';
import SettingsIcon from '@mui/icons-material/Settings';

function NavBar() {
  let navigate = useNavigate()
  const location = useLocation();
  const [value, setValue] = useState("/");

  useEffect(() => {
    setValue(location.pathname)
  },[location.pathname])

  const navbarStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
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
        <BottomNavigationAction label="Battery" value="/young/home" icon={<Battery2BarIcon />} />
        <BottomNavigationAction label="Settings" value="/settings" icon={<SettingsIcon />} />
      </BottomNavigation>
  );
}

export default NavBar;
