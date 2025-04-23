import React, { createContext, useState, useEffect } from 'react';

// 1) Define two example users
const INITIAL_USERS = [
  {
    email: 'user1@example.com',
    password: 'password1',
    name: 'User One',
    preferences: {
      area: 'Oulu',
      children: 2,
      transport: 'By bus',
      hobbies: ['hiking'],
      income: 45000,
    },
  },
  {
    email: 'user2@example.com',
    password: 'password2',
    name: 'User Two',
    preferences: {
      area: 'Helsinki',
      children: 0,
      transport: 'By bike',
      hobbies: ['Cross‑country skiing'],
      income: 62000,
    },
  },
];

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // load from localStorage or fall back to our two examples
  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem('users')) || INITIAL_USERS
  );
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem('currentUser')) || null
  );

  // persist users & currentUser
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const register = (newUser) => {
    setUsers(u => [...u, newUser]);
    setCurrentUser(newUser);
  };

  const login = (email, pw) => {
    const u = users.find(u => u.email === email && u.password === pw);
    if (u) {
      setCurrentUser(u);
      return true;
    }
    return false;
  };

  const logout = () => setCurrentUser(null);

  const updatePreferences = (prefs) => {
    if (!currentUser) return;
    const updated = { ...currentUser, preferences: prefs };
    setCurrentUser(updated);
    setUsers(us =>
      us.map(u => (u.email === updated.email ? updated : u))
    );
  };

  return (
    <AuthContext.Provider
      value={{ users, currentUser, register, login, logout, updatePreferences }}
    >
      {children}
    </AuthContext.Provider>
  );
};
