const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const port = 3000;
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log("connected");
});

httpServer.listen(port, () => {
    console.log(`Server listening on ${port}`);
});