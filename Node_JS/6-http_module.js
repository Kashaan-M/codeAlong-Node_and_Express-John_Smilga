const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('welcome to our Homepage');
  }
  if (req.url === '/about') {
    res.end('Welcome to the About page');
  }
  res.end("<h1>Oops Page not found</h1><a href='/'>Back to Home</a>");
});

server.listen(5000);
