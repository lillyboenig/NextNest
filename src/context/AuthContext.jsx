// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const initialUsers = [
  {
    email:    'user1@example.com',
    password: 'pass1',
    name:     'User 1',
    preferences: {
      area:      'Oulu',
      children:  2,
      transport: 'By bus',
      hobbies:   ['hiking'],
      income:    45000,
    },
  },
  {
    email:    'user2@example.com',
    password: 'pass2',
    name:     'User 2',
    preferences: {
      area:      'Helsinki',
      children:  0,
      transport: 'By bike',
      hobbies:   ['cross-country skiing'],
      income:    62000,
    },
  },
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) setCurrentUser(user);
    return user;
  };

  const updatePreferences = (newPrefs) => {
    if (!currentUser) return;
    const updated = { ...currentUser, preferences: newPrefs };
    setUsers(us => us.map(u => u.email === currentUser.email ? updated : u));
    setCurrentUser(updated);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, updatePreferences }}>
      {children}
    </AuthContext.Provider>
  );
};
