import React, { useState } from 'react';
import './Chatbot.css';
import { FaTimes } from 'react-icons/fa';
import botIcon from '../../Images/bot.png'; // Import your bot image

const responses = {
    "default": "Sorry, I didn't understand that. Can you try asking something else?",
    "help": "What issue are you facing? I can assist with website issues or company details.",
    "thank you": "You're welcome!"
};

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [isNameEntered, setIsNameEntered] = useState(false);

    const handleSendMessage = () => {
        if (input.trim()) {
            // Add user's message immediately
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, fromUser: true }
            ]);

            const botResponse = !isNameEntered
                ? `Hi ${input}, how can I assist you today?`
                : responses[input.toLowerCase()] || responses['default'];

            setTimeout(() => {
                // Add only the bot's message after a delay
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: botResponse, fromUser: false }
                ]);
            }, 1000);

            // If it's the first message (name input), mark the name as entered
            if (!isNameEntered) {
                setUserName(input);
                setIsNameEntered(true);
            }

            // Clear the input after sending the message
            setInput('');
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen ? (
                <div className="chatbot-box">
                    <div className="chatbot-header">
                        <h4>Chatbot</h4>
                        <button className="close-chatbot" onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="chatbot-body">
                        <div className="chatbot-messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={msg.fromUser ? 'user-message' : 'bot-message'}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="chatbot-input-section">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder={isNameEntered ? "Type your message..." : "Enter your name..."}
                            />
                            <button className="send-section" onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            ) : (
                <button className="open-chatbot" onClick={() => setIsOpen(true)}>
                    <img src={botIcon} alt="Chatbot Icon" style={{ width: '50px' }} />
                </button>
            )}
        </div>
    );
};

export default Chatbot;
