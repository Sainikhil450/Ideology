import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext'; // Import useAuth
import './IdeasGallery.css';

const IdeasGallery = () => {
    const { user } = useAuth(); // Get the current user from AuthContext
    const [ideas, setIdeas] = useState([]); // State to store ideas

    // Fetch ideas from the backend
    useEffect(() => {
        if (!user) {
            return; // If user is not logged in, do not fetch ideas
        }

        fetch(`http://localhost:8081/ideas?email=${user.email}`) // Pass the user's email in the query
            .then(response => response.json())
            .then(data => setIdeas(data))
            .catch(error => console.error('Error fetching ideas:', error));
    }, [user]); // Re-run when user changes

    return (
        <div className="ideas-gallery">
            <div className="ideas-list">
                {ideas.length > 0 ? (
                    ideas.map((idea, index) => (
                        <div key={index} className="idea-box animate-slideInFromBottom">
                            <h2 className="idea-title">{idea.title}</h2>
                            <p className="idea-name">Submitted by: {idea.name}</p>
                            <p className="idea-address">Address: {idea.address}</p>
                            <p className="idea-city">City: {idea.city}</p>
                            <p className="idea-state">State: {idea.state}</p>
                            <p className="idea-area">Area: {idea.area}</p>
                            {idea.file && (
                                <div>
                                    <p>Attachment: <a href={`http://localhost:8081/uploads/${idea.file}`} target="_blank" rel="noopener noreferrer">Download</a></p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No ideas to display</p>
                )}
            </div>
        </div>
    );
};

export default IdeasGallery;
