const http = require('http');
const app = require('./app');


//console.log(http);

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port)
console.log("Server Running On " + port);
