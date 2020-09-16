require('dotenv').config();

const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const PORT = process.env.PORT;

const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
// const server = http.createServer(app);

const uri = process.env.MONGODB_URL;
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chatroom');
const jwt = require('jwt-then');
const server = app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
const io = require('socket.io')(server);
const socketManager = require('./socketManager');
//middlewares
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else{
  app.use(morgan('combined'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());


mongoose.connect(uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
}).then(() => {
  app.use('/user', userRoutes);
  app.use('/chatroom', chatRoutes);

}).catch((err) => {
  console.log('DB connection failed')
});
mongoose.connection.once("open", () => {
  console.log("DB connected");
});
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    socket.userid = payload.id; 
    next();
} catch(err) {
  console.log("Error connecting socket", err);
}
});


io.on('connection', socketManager);



