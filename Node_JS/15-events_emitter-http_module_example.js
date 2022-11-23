const http = require('http');

//const server = http.createServer((req, res) => {
//res.end('Welcome');
//});

// Using Event Emitter API
const server = http.createServer();

//emits request event
// Subscribe to it / Listen for it / respond to it
server.on('request', (req, res) => {
  res.end('Welcome');
});

server.listen(3000, () => console.log('Server running at port 3000'));
