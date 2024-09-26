import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const logoText = 'Ideology';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleProfileClick = () => {
        if (user) {
            navigate('/profile'); // Navigate to the profile page
        }
    };

    return (
        <div className="header-container">
            <div className="logo">
                <h1>
                    {logoText.split('').map((char, index) => (
                        <span key={index} className={`letter letter-${index}`}>
                            {char}
                        </span>
                    ))}
                </h1>
            </div>

            <div className="nav-container">
                <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-list">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/ideas-submit">Ideas</Link></li>
                        <li><Link to="/ideas-gallery">Gallery</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </nav>

                <div className="profile-section">
                    {user ? (
                        <>
                            <div className="profile-icon" onClick={handleProfileClick}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>

                <button className="menu-toggle" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>
            </div>
        </div>
    );
};

export default Header;
