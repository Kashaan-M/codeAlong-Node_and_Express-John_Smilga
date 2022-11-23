const fs = require('fs');

const stream = fs.createReadStream('./content/big.txt', {
  highWaterMark: 90000,
  encoding: 'utf8',
});

// By Default size of the buffer is 64kb
// last buffer - remainder
// highWaterMark -control size
// const stream = fs.createReadStream('./content/big.txt',{highWaterMark: 90000, encoding: 'utf8'})  ~ 90000 == 90kb

stream.on('data', (result) => {
  console.log(result);
});
/*
 === If there was an error ====
 const stream = fs.createReadStream('./connt/big.txt', {
  highWaterMark: 90000,
  encoding: 'utf8',
});
*/

stream.on('error', (err) => console.error(err));
