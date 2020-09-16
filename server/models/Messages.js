const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    members: [{
        type: String,
        ref: "Users"
    }],
    message: {
        author: {
            type: String,
            ref: "Users",
        },
        body: {
            type: String
        },
        createdAt: {
            type: Date,
        }
    }
    
    
});

module.exports = mongoose.model('Messages', messageSchema);