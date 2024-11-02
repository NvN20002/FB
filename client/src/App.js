import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        setIsLoggedIn(false); // Set logged-in state to false
    };

    const handleRegister = () => {
        setIsLoggedIn(false); // Set to false so the user needs to log in again
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path="/landing" element={<LandingPage onLogout={handleLogout} />} />
                            <Route path="*" element={<Navigate to="/landing" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                            <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
