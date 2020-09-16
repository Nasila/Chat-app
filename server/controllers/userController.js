
const mongoose = require('mongoose');
const Users = require('../models/Users');
const Messages = require('../models/Messages');
const sha256 = require('js-sha256');
const jwt = require('jwt-then');
const Conversations = require('../models/Conversations');


exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await Users.findOne({
        email});
    if(userExists) {
        return res.status(400).json({
            error: "Email already exists."
        })
    } 
    else {
        const userDetails = new Users({
            username,
            email,
            password: sha256(password + process.env.SALT)
        });
        await userDetails.save();
            
            return res.json({
                message: "User " + username + " registered successfully" });
    }       
            
    };
    
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
    const user = await Users.findOne({ email,
        password: sha256(password+process.env.SALT)});
    if(!user) {
        return req.status(400).json({
            error: "Email and password did not match"
        });
    }  
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log("token", token);
    return res.json({
        name: user.username,
        id: user._id,
    message: "User logged in successfully",
    token,
    });
    } catch(err) {
        return res.status(400).json({
            error: "Email and password did not match"
        })
    }
            
}

exports.userList = async (req, res) => {
    const id = req.params.id;
    await Users.find({'_id': {$ne: id}}, {password: 0}).exec(
        (err,user) => {
            if(err) {
                return res.status(400).json({
                    error: "something went wrong, please try again"
                });
            } 
            else {
               return res.json({
                result: user
               });
                
            }
        }
    );
};

//update the invites list 

exports.addInvites = async (req,res) => {

    const inviteId = req.params.id;
    const {userId, approved} = req.body;
   
    await Users.findByIdAndUpdate(inviteId, {
        $push: {
            invites: [{
                "id": userId,
                "approved": approved
        }]
    }},
    {new: true},
    
    (err,user) => {
        if(err) {
            return res.status(400).json({
                error: "something went wrong, please try again"
            });
        } 
        if(user) {
            return res.json({
                result: user,
                message: "Invite sent!"
            })
        }
      
     })
};

exports.currentUser = async (req, res) => {
    const id = req.params.id;
    console.log("current user id", id);
    await Users.findOne({'_id': id}, {password: 0}).exec(
        (err,user) => {
            if(err) {
                return res.status(400).json({
                    error: "something went wrong, please try again"
                });
            } 
            else {
               return res.json({
                result: user
               });
                
            }
        }
    );
};

exports.updateContact = async (req, res) => {
    const userId = req.params.id;
    console.log("inside update", userId);
    const {inviteId} = req.body; 
    await Users.findOneAndUpdate({'_id': userId, 'invites.id': inviteId},
    { $set: {
        "invites.$.approved": true},
     $push : {
        "contacts" : [{
            "id": inviteId
        }]
    }},
    {new: true}).exec((err,user)  => {
        if(err) {
            return res.status(400).json({
                error: "something went wrong, please try again"
            });
        } 
        else {
           return res.json({
            result: user
           });
            
        }
    })
}

exports.updateInvitedUser = async (req,res) => {
    const inviteId = req.params.id; 
    const {userId} = req.body; 
    console.log("invite id",inviteId);
    await Users.updateOne({'_id': inviteId},
    { $set: {
        "contacts": {
            "id": userId
        }
    }
    }).exec((err,user)  => {
        if(err) {
            return res.status(400).json({
                error: "something went wrong, please try again"
            });
        } 
        else {
           return res.json({
            result: user
           });
            
        }
    })
}

exports.addMessage = async(req,res) => {
    const {curUser,username, messageObject} = req.body;
    await Messages.findOneAndUpdate(
        {'members': {$all : [curUser,username]}},
        {$set: {
            author: messageObject.username,
            message: messageObject.message,
            createdAt: { $type: "timestamp" }
        }},
        {upsert: true,
        new: true}
    ).exec((err,user)  => {
        if(err) {
            return res.status(400).json({
                error: "something went wrong, please try again"
            });
        } 
        else {
           return res.json({
            result: user
           });
            
        }
    })
}