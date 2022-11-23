const http = require('http');
const fs = require('fs');

console.log('Streams Example');
http
  .createServer((req, res) => {
    //const text = fs.readFileSync('./content/big-2.txt', 'utf8');
    //res.end(text);

    /** Alternate Code using Streams **/
    const fileStream = fs.createReadStream('./content/big-2.txt', { encoding: 'utf8' });
    fileStream.on('open', () => {
      //fileStream.pipe()
      /** 'Stream.pipe()' method pushes from ReadStream to WriteStream . If we can read data in chunks(using fs.createReadStream) then we can write data in chunks using
       * this pipe() method with the 'res' object.
       * What happens under the hood is 'res' object can be set up as a writeable stream
       **/
      fileStream.pipe(res);
    });
    fileStream.on('error', (err) => res.end(err));
  })
  .listen(3000, () => console.log('Server listening at port 3000'));
