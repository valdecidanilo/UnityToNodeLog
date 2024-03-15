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

// Rota para receber logs
app.post('/receive-log', (req, res) => {
    const logData = req.body;
    console.log(`${logData.user}: ${logData.message} timestamp: ${logData.timestamp}`);
    res.send('Log received');
});

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('Nova conexão:', socket.id);
    
    // Adicionar usuário à lista quando ele se conecta
    users.push({ id: socket.id });

    // Socket.IO disconnect event
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
        
        // Remover usuário da lista quando ele se desconectar
        users = users.filter(user => user.id !== socket.id);
    });
});

server.listen(port, () => {
    console.log(`Servidor Node.js rodando na porta ${port}`);
});
