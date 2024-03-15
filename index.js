// Importa o módulo HTTP do Node.js
const http = require('http');
// Importa o módulo Socket.IO
const socketIO = require('socket.io');


// Cria o servidor HTTP
const server = http.createServer((req, res) => {
    res.end('Server is running');
});

// Inicia o servidor na porta 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Cria uma instância do Socket.IO e passa o servidor HTTP
const io = socketIO(server);

// Lista de usuários
const userList = [];

// Evento de conexão do Socket.IO
io.on('connection', (socket) => {
    console.log('User connected');

    // Envio da lista de usuários para o cliente
    socket.emit('userList', userList);

    // Evento para adicionar um novo usuário
    socket.on('addUser', (user) => {
        userList.push(user);
        // Envio da lista atualizada para todos os clientes
        io.emit('userList', userList);
    });

    // Evento de desconexão do Socket.IO
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});