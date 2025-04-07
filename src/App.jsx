// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import AccountCreation from './components/AccountCreation';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import Preferences from './components/Preferences';
import MapPage from './components/MapPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/create-account" element={<AccountCreation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
