const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
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

// Tratamento de conexão de clientes (simulado sem Socket.IO)
server.on('connection', (socket) => {
    console.log('Nova conexão:', socket.remoteAddress);
    
    // Adicionar usuário à lista quando ele se conecta
    users.push({ ip: socket.remoteAddress });

    // Tratamento de desconexão de clientes
    socket.on('close', () => {
        console.log('Cliente desconectado:', socket.remoteAddress);
        
        // Remover usuário da lista quando ele se desconectar
        users = users.filter(user => user.ip !== socket.remoteAddress);
    });
});

server.listen(port, () => {
    console.log(`Servidor Node.js rodando na porta ${port}`);
});
