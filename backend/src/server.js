const app = require('./app');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');
const Chat = require('./models/chat');

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || '*',  
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', async (data) => {
        try {
            console.log('Message arrived');
            const { message, author } = data; 
            
            const newChat = new Chat({ message, author });
            await newChat.save();

            io.emit('chat message', newChat);
        } catch (error) {
            console.error('Error saving chat message:', error);
            socket.emit('error', { message: 'Unable to save chat message.' });
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
