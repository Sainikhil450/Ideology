import React, { useState } from 'react';
import { useAuth } from '../../AuthContext'; // Use useAuth instead of useUser
import './IdeasSubmit.css';

const IdeasSubmit = () => {
    const { user } = useAuth(); // Get the current user from AuthContext
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        phone: '',
        type: 'Food Business',
        file: null,
        name: '',
        address: '',
        state: '',
        city: '',
        area: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFormData((prev) => ({ ...prev, file: selectedFile }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (!user) {
            alert("You must be logged in to submit an idea.");
            return;
        }

        // Prepare form data for submission
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('title', formData.title);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('phone', formData.phone);
        formDataToSubmit.append('type', formData.type);
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('address', formData.address);
        formDataToSubmit.append('state', formData.state);
        formDataToSubmit.append('city', formData.city);
        formDataToSubmit.append('area', formData.area);
        formDataToSubmit.append('email', user.email); // Add the user's email to the form data
        if (formData.file) {
            formDataToSubmit.append('file', formData.file); // Append the file if uploaded
        }

        fetch('http://localhost:8081/ideas', {
            method: 'POST',
            body: formDataToSubmit,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Success message
            alert('Idea submitted successfully!'); // Optional success message
        })
        .catch(error => {
            console.error('Error:', error); // Error handling
            alert('An error occurred while submitting your idea. Please try again.');
        });

        // Reset form fields
        setFormData({
            title: '',
            description: '',
            phone: '',
            type: 'Food Business',
            file: null,
            name: '',
            address: '',
            state: '',
            city: '',
            area: '',
        });
    };

    return (
        <div className="fullscreen-container">
            <div className="max-w-xl animate-slideInFromBottom">
                <h1 className="text-center text-3xl font-bold text-gray-800 mb-4 animate-fadeIn">Submit Your Ideas</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 animate-fadeIn">
                    {/* Idea Title */}
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-gray-700 mb-1">Idea Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-gray-700 mb-1">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-lg resize-none h-24"
                        ></textarea>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-gray-700 mb-1">Phone Number:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Type of Idea */}
                    <div className="flex flex-col">
                        <label htmlFor="type" className="text-gray-700 mb-1">Type of Idea:</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="Food Business">Food Business</option>
                            <option value="Software">Software</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-700 mb-1">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col">
                        <label htmlFor="address" className="text-gray-700 mb-1">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* State */}
                    <div className="flex flex-col">
                        <label htmlFor="state" className="text-gray-700 mb-1">State:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* City */}
                    <div className="flex flex-col">
                        <label htmlFor="city" className="text-gray-700 mb-1">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Area */}
                    <div className="flex flex-col">
                        <label htmlFor="area" className="text-gray-700 mb-1">Area:</label>
                        <input
                            type="text"
                            id="area"
                            name="area"
                            value={formData.area}
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* File Upload */}
                    <div className="flex flex-col">
                        <label htmlFor="file" className="text-gray-700 mb-1">Upload a File:</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleFileChange}
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="sub mt-4"
                    >
                        Submit Idea
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IdeasSubmit;
