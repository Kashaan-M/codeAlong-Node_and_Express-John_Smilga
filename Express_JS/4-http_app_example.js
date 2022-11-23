const http = require('http');
const fs = require('fs');
const path = require('path');

// get all files
const homepage = fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf8');
const homepage_css = fs.readFileSync(path.resolve(__dirname, './public/styles.css'), 'utf8');
const homepage_js = fs.readFileSync(path.resolve(__dirname, './public/browser-app.js'), 'utf8');
const homepage_svg = fs.readFileSync(path.resolve(__dirname, './public/logo.svg'), 'utf8');
const server = http.createServer((req, res) => {
  console.log('user hit the server');
  //console.log(req.method);
  //console.log(req.url);
  const url = req.url;
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(homepage);
    res.end();
  } else if (url === '/styles.css') {
    res.writeHead(200, { 'content-type': 'text/css' });
    res.write(homepage_css);
    res.end();
  } else if (url === '/browser-app.js') {
    res.writeHead(200, { 'content-type': 'text/javascript' });
    res.write(homepage_js);
    res.end();
  } else if (url === '/logo.svg') {
    res.writeHead(200, { 'content-type': 'image/svg+xml' });
    res.write(homepage_svg);
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
