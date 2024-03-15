const https = require('https');
const fs = require('fs');
const socketIO = require('socket.io');

// Carregar certificado SSL
const privateKey = fs.readFileSync('chave-privada.pem', 'utf8');
const certificate = fs.readFileSync('certificado.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Criar servidor HTTPS
const httpsServer = https.createServer(credentials);

// Iniciar servidor na porta 3000
httpsServer.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Criar uma instância do Socket.IO e passar o servidor HTTPS
const io = socketIO(httpsServer);

// Lógica do Socket.IO
io.on('connection', (socket) => {
    console.log('User connected');

    // Lógica de manipulação de eventos Socket.IO aqui

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});