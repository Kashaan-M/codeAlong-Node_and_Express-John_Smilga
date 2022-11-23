const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    //
    res.write('Home Page');
    res.end();
  }
  if (req.url === '/about') {
    // BLOCKING CODE
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        console.log(`${i}, ${j}`);
      }
    }
    res.write('About Page');
    res.end();
  }
  res.write('Error Page');
  res.end();
});

server.listen(5000, () => {
  console.log('Server listening at port 5000');
});
