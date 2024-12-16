const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    author: { 
        type: String, 
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true, 
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now 
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
