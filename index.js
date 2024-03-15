const { readFileSync } = require("fs");
const { createServer } = require("https");
const { Server } = require("socket.io");

const httpsServer = createServer({
    key: readFileSync("chave-privada.pem"),
    cert: readFileSync("certificado.pem")
});

const io = new Server(httpsServer, { /* options */ });

const connectedUsers = {};

io.on("connection", (socket) => {
    console.log("usuario conectado");
    socket.on("user_connected", (username) => {
        connectedUsers[socket.id] = username;
        console.log(connectedUsers);
        io.emit("user_list", Object.values(connectedUsers));
    });

    socket.on("disconnect", () => {
        delete connectedUsers[socket.id];
        console.log("usuario desconectado");
        io.emit("user_list", Object.values(connectedUsers));
    });
});

httpsServer.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});