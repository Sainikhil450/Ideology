import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext'; 
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { FaCog } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa'; // Import back arrow icon

const Profile = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State for editing mode
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const response = await fetch(`http://localhost:8081/profile?email=${user.email}`);
                    const data = await response.json();
                    if (response.ok) {
                        setProfile(data);
                        setFormData({
                            name: data.name,
                            email: data.email,
                            phone: data.phone
                        });
                    } else {
                        console.error('Error fetching profile:', data.error);
                    }
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
        };

        fetchProfile();
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8081/updateProfile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email, // Pass the email to identify the user in the DB
                    name: formData.name,
                    newEmail: formData.email,
                    phone: formData.phone
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setProfile({ ...profile, ...formData });
                setIsEditing(false); // Turn off edit mode after saving
            } else {
                console.error('Error updating profile:', data.error);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!user) {
        return <p>Please log in to view your profile.</p>;
    }

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="profile-container">
            
            
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="Name" 
                        required
                    />
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="Email" 
                        required
                    />
                    <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder="Phone" 
                        required
                    />
                    <button type="submit">Save Changes</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <img 
                        src={profile.image ? `http://localhost:8081/uploads/${profile.image}` : 'default-avatar.png'} 
                        alt="Profile" 
                        className="profile-image" 
                    />
                    <h1 className="profile-name">{profile.name}</h1>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    
                    <div className="button-section">
                        <div className="edit-container">
                            <button onClick={handleEdit} className="edit-button">Edit</button>
                        </div>

                        <div className="settings-container">
                            <FaCog className="settings-icon" /> <span>Settings</span>
                        </div>

                        <div className="logout-container">
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </div>
                    </div>
                </>
            )}
            {/* Back button to navigate to the home page */}
            <button className="back-button" onClick={() => navigate('/home')}>
                <FaArrowLeft /> Back to Home
            </button>
        </div>
    );
};

export default Profile;
