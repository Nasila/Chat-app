const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
        username: {
            type: String,
            required: 'Name is required',
            trim: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: 'Email is required',
        },
        password: {
            type: String,
            required: 'Password is required!'
        },
        
        // message: {
        //     type: String,
        //     required: 'Message cannot be empty!'
        // },
        // chatRooom: {
        //     type: String,
        //     required: 'Enter the chat room'
        // }
        contacts: [
            {
                id: {
                    type:mongoose.Schema.Types.ObjectId,
                }
            }
        ],

        invites: [
            {
                id: {
                    type:mongoose.Schema.Types.ObjectId,
                },
                approved: {
                    type: Boolean
                }
            }
        ]
    },   
    {
    timestamps: true,
    });

module.exports = mongoose.model('Users', chatSchema);