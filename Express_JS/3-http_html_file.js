const http = require('http');
const fs = require('fs');
const path = require('path');

// get all files
const homepage = fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf8');

const server = http.createServer((req, res) => {
  console.log('user hit the server');
  //console.log(req.method);
  //console.log(req.url);
  const url = req.url;
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(homepage);
    res.end();
  } else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('<h1>About Page</h1>');
    res.end();
  } else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.write('<h1>Page Not found</h1>');
    res.end();
  }
});
server.listen(5000);
