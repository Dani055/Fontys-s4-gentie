import React, {useContext, useState, useEffect} from 'react';
import { Route, Routes, BrowserRouter as Router, useNavigate } from "react-router-dom";
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
import AuthProtected from './guards/AuthProtected';
import AddRecipePage from './pages/AddRecipePage/AddRecipePage';
import AddRecipeSuccessPage from './pages/AddRecipeSuccessPage/AddRecipeSuccessPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import VolunteerProfilePage from './pages/VolunteerProfilePage/VolunteerProfilePage';
import { Button } from '@mui/material';

function App() {
  const {isElder,setIsElder, loggedUser, setLoggedUser} = useContext(AppContext)

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const logout = () => {
    setIsElder(null)
    setLoggedUser(null)

  }

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await window.Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Permission not granted for Notification');
      }
    }
    
  };

  return (
    <ThemeProvider theme={isElder !== true && isElder !== null ? theme : themeElder}>
    <div className="App">
      <Router>
        <div className="content">
        <Button variant="contained" className="logout-button" color='primary' onClick={logout}><i class="bi bi-box-arrow-right"></i></Button>
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
            <AuthProtected loggedUser={loggedUser}>
              <RecipesPage/>
            </AuthProtected>
            
          } />
          <Route path="/profile/:userId" element={
            <AuthProtected loggedUser={loggedUser}>
              <VolunteerProfilePage/>
            </AuthProtected>
            
          } />
          <Route path="/gallery" element={
            <AuthProtected loggedUser={loggedUser}>
              <GalleryPage/>
            </AuthProtected>
            
          } />
          <Route path="/recipes/add" element={
            <AuthProtected loggedUser={loggedUser}>
              <AddRecipePage/>
            </AuthProtected>
            
          } />
          <Route path="/recipes/add/success" element={
            <AuthProtected loggedUser={loggedUser}>
              <AddRecipeSuccessPage/>
            </AuthProtected>
            
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
