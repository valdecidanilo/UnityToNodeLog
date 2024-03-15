const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

app.use(bodyParser.json());

// Array para armazenar os usuários
let users = [];

// Rota para obter a lista de usuários
app.get('/usuarios', (req, res) => {
    res.json(users);
});

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);
    
    users.push({ id: socket.id });
    io.emit('updateUserList', users);
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
        users = users.filter(user => user.id !== socket.id);
        io.emit('updateUserList', users);
    });
    
    // Rota para publicar logs
    socket.on('post-log', (jsonLog) => {
        console.log(`${jsonLog.user}: ${jsonLog.message} timestamp: ${jsonLog.timestamp}`);
    });
});

server.listen(port, () => {
    console.log(`Servidor Node.js rodando na porta ${port}`);
});
