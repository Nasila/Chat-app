const io = require('./index').io;

const Users = require('./models/Users');
const Conversations = require('./models/Conversations');
const Messages = require('./models/Messages');
const connectedUsers = [];
const onlineUsers = [];

module.exports = async function(socket) {
    console.log('We have a new connection!!', socket.userid);
    const user1 = await Users.findOne({'_id': socket.userid});
      socket.username = user1.username;
    socket.on('join',  ({id}) => {
      console.log("user id",id);
      console.log("socket username", socket.username);
      connectedUsers[socket.username] = socket.id;
      onlineUsers.push(id);
      console.log("online users",onlineUsers);
      socket.broadcast.emit('online',{
        onlineUsers});
      // console.log("connected users:", io.socket.clients);
      console.log("connected users:", connectedUsers);
     
    }); 
  
   console.log(socket.username);
   
    socket.on('private_chat', function(data){
      
     const {username, message} = data;
     
        console.log("socket id:",connectedUsers[username]);
        console.log("receiver inside conn user:", socket.username +message);
          socket.to(connectedUsers[username]).emit('private_chat',{
              //The sender's username
              username : socket.username,
  
              //Message sent to receiver
              message : message
          });
  
  });

  socket.on('disconnect', () => {
    delete connectedUsers[socket.username];
    onlineUsers.pop(socket.username);
    
    console.log("connected users after disconnect", connectedUsers,onlineUsers);
  // io.emit('exit',connectedUsers); 
  });

} 
      //   
      //   const user2 = await Users.findOne({'_id': chatId});
      //   console.log("Message", message);
      //   console.log(user1,user2);
      //   const convId = '';
      //   const conv = await Conversations.findOne({'members[0]': user1.username,
      // 'members[1]' : user2.username});
      // if(conv) {
      //   convId = conv._id;
      // }
      // else {
      //   const convInsert = new Conversations({
      //     members:[user1.username, user2.username]
      //   });
      //  await convInsert.save();
      //  console.log("conversation", convInsert);
      //  convId = convInsert._id;
      // }
       

    
    
//     //     // Save the message to the database.
//     //     message.save((err) => {
//     //       if (err) return console.error(err);
//     //     });
    
//     //     // Notify all other users about a new message.
//     //     socket.broadcast.emit('push', msg);
//     // });

//     // socket.on('join', ({ name, room}, callback) => {
//     //    const { error, user } = users.addUser({ name, room });

//     //    if(error) return callback(error);
//     //    socket.emit('message', { user:'admin', text: `${user.name}, Welcome to the room ${user.room}`});
//     //    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!!`});
//     //    socket.join(user.room);
//     //    callback();
//     // });
//     socket.on('disconnect', () => {
//         console.log('User had left!!');
//     });
// });