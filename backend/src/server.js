const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-lg3sy.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectedUsers = {};

io.on('connection', socket => {
    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

// este trecho precisa estar antes das rotas
// disponibiliza o io e o connectedUsers para todas as rotas da app
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

// GET, POST, PUT, DELETE

// req.query.<parametro> = acessar query params (filtros) *GET*
// req.params.<parametro> = acessar route params (edição e delete) *PUT e DELETE*
// req.body = acessar corpo da requisição (criação e edição) *POST*

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);


server.listen(3333);
