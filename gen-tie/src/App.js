import React, {useContext, useState} from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import theme from './theme';
import HomeElder from './pages/HomeElder/HomeElder';
import { AppContext } from './StateProvider';
import YoungProtected from './guards/YoungProtected';
import ElderProtected from './guards/ElderProtected';
import Home from './pages/Home/Home';

function App() {
  const {isElder, setIsElder} = useContext(AppContext)


  return (
    <ThemeProvider theme={theme}>
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
        </Routes>
        </div>
        {isElder !== null ? <NavBar/> : null}
      </Router>
    </div>
     </ThemeProvider>
    
  );
}

export default App;
