const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();

// Redirecionar todas as solicitações HTTPS para HTTP
app.use((req, res, next) => {
    if (req.secure) {
        res.redirect('http://' + req.headers.host + req.url);
    } else {
        next();
    }
});

// Criar servidor HTTP
const server = http.createServer(app);

// Criar uma instância do Socket.IO e passar o servidor HTTP
const io = socketIO(server);

// Lógica do Socket.IO aqui

const PORT = 3000; // Usar a porta 80 para HTTP

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});