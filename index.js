const { readFileSync } = require("fs");
const { createServer } = require("https");
const { Server } = require("socket.io");

const httpsServer = createServer({
  key: readFileSync("chave-privada.pem"),
  cert: readFileSync("certificado.pem")
});

const io = new Server(httpsServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
});

httpsServer.listen(3000);