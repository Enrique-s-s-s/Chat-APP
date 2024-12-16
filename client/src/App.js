import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import NameEntry from './components/NameEntry';
import './styles/App.css';

const socket = io(process.env.REACT_APP_SOCKET_URL);

function App() {
    const [nameEntered, setNameEntered] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.connect();
        
        const fetchChat = async () => {
            try {
                const response = await fetch('/api/chat');
                const data = await response.json();
                setChat(data); 
            } catch (error) {
                console.error('Error fetching chat data:', error);
                setChat([]); 
            }
        };
        fetchChat();

        socket.on('chat message', (data) => {
            setChat((prev) => [...prev, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (name && message) {
            const newMessage = {
                author: name,
                message
            };
            socket.emit('chat message', newMessage);
            setMessage('');
        }
    };

    return (
        <div className="App">
            <h1 className="app-header">ET.CHAT</h1>
            {!nameEntered ? (
                <NameEntry setNameEntered={setNameEntered} setName={setName} />
            ) : (
                <div className="chat-container">
                    <div className="chat-box">
                        {chat.map((msg) => (
                            <div key={msg._id} className={`chat-message ${msg.author === name ? 'sent' : 'received'}`}>
                                <div className="message-header">
                                    <strong>{msg.author}</strong>
                                </div>
                                <div className="message-bubble">
                                    <div className="message-content">{msg.message}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendMessage} className="message-form">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="message-input"
                        />
                        <button type="submit" className="send-btn">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default App;
