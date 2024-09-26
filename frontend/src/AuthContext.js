import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create an AuthContext
const AuthContext = createContext();

// Custom hook for using AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null; // Load user from localStorage if available
    });

    const login = async (email, password) => {
        try {
            console.log("Logging in with:", { email, password }); // Debugging log
            const response = await axios.post('http://localhost:8081/login', { email, password });
            
            if (response.data.message === "Login successful") {
                const userData = { email };
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                return true; // Successful login
            } else {
                console.error("Login failed:", response.data.message); // More detailed logging
                return false; // Login failed
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            return false;
        }
    };
    

    // Signup function
    const signup = async (name, email, password, phone, image) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('phone', phone);
            if (image) {
                formData.append('image', image); // Append the image if provided
            }

            const response = await axios.post('http://localhost:8081/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.message === "User registered successfully") {
                return true; // Successful signup
            } else {
                return false; // Signup failed
            }
        } catch (error) {
            console.error('Signup error:', error);
            return false;
        }
    };

    // Fetch user profile
    const fetchProfile = async (email) => {
        try {
            const response = await axios.get(`http://localhost:8081/profile?email=${email}`);
            if (response.data) {
                setUser(prev => ({ ...prev, ...response.data })); // Merge existing user data with fetched profile
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const isAuthenticated = !!user; // Check if the user is authenticated

    return (
        <AuthContext.Provider value={{ user, login, signup, fetchProfile, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
