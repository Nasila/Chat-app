const mongoose = require('mongoose');
const Chatroom = require('../models/Chatroom');

exports.chatroomController = async (req, res) => {
    const { name } = req.body;
    const chatroom = new Chatroom({
        name,
    });

    const chatroomExists = await Chatroom.findOne({ name });

    if(chatroomExists) throw "Chatroom with that name already exists";

    await chatroom.save()
    .then(item => {
        
        res.send("Chatroom created successfully");
        })
        .catch(err => {
        res.status(400).send("unable to create a chatroom");
        });
};

