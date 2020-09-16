const mongoose = require('mongoose');
const Users = require('./Users');

const conversationSchema = new mongoose.Schema({
    members: [
        {
            type: String,
            ref: "Users"
        }
    ]
    });

module.exports = mongoose.model("Conversation", conversationSchema);