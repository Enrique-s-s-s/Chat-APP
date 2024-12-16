const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const Chat = require('./models/chat')
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/api/chat', async (req, res) => {
    try {
        const chats = await Chat.find(); 
        res.status(200).json(chats);    
    } catch (err) {
        console.error(err);            
        res.status(500).json({ message: 'Server Error' }); 
    }
});


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../../client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
}

module.exports = app;
