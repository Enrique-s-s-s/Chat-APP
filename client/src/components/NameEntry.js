import React, { useState } from 'react';

const NameEntry = ({ setNameEntered, setName }) => {
    const [name, setInputName] = useState('');

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            setName(name);
            setNameEntered(true);
        }
    };

    return (
        <div className="name-entry-container">
            <div className="name-entry-card">
                <h2 className="name-entry-header">Enter Your Name</h2>
                <form onSubmit={handleNameSubmit} className="name-entry-form">
                    <input
                        type="text"
                        placeholder="Your name"
                        onChange={(e) => setInputName(e.target.value)}
                        value={name}
                        autoFocus
                        onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit(e)} 
                        className="name-input"
                    />
                    <button type="submit" className="enter-chat-btn">
                        Enter the Chat
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NameEntry;
