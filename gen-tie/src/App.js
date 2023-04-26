import React, {useContext, useState, useEffect} from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import theme from './theme';
import themeElder from './themeElder';
import HomeElder from './pages/HomeElder/HomeElder';
import { AppContext } from './StateProvider';
import YoungProtected from './guards/YoungProtected';
import ElderProtected from './guards/ElderProtected';
import Home from './pages/Home/Home';
import RecipesPage from './pages/RecipesPage/RecipesPage';

function App() {
  const {isElder, setIsElder} = useContext(AppContext)

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await window.Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Permission not granted for Notification');
      }
    }
    
  };

  return (
    <ThemeProvider theme={isElder ? themeElder : theme}>
    <div className="App">
      <Router>
        <div className="content">
        <Routes>
          <Route path="/" element={
            <LandingPage/>
          } />
          <Route path="/young/home" element={
            <YoungProtected isElder={isElder}>
              <Home/>
            </YoungProtected>
            
          } />
          <Route path="/elder/home" element={
            <ElderProtected isElder={isElder}>
              <HomeElder/>
            </ElderProtected>
          } />
          <Route path="/recipes" element={
            <RecipesPage/>
          } />
        </Routes>
        </div>
        {isElder !== null ? <NavBar/> : null}
      </Router>
    </div>
     </ThemeProvider>
    
  );
}

export default App;
