import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import AccountCreation from './components/AccountCreation';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import Preferences from './components/Preferences';
import MapPage from './components/MapPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/create-account" element={<AccountCreation />} />
      <Route path="/login" element={<Login />} />
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/preferences" element={<Preferences />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
}

export default App;
