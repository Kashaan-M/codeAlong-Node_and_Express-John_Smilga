// When we have to handle and manipulate Streaming Data. For example Continuous source for a big file Streams come in handy
// Streams are used to read and write sequentially
// In Node JS we have four Streams
// Writeable => to write data sequentially
// Readable =>to read data sequentially
// Duplex => to both read and write data sequentially
// Transform => when data can be modified when writing or reading
const fs = require('fs');

for (let i = 0; i < 10000; i++) {
  fs.writeFileSync('./content/big.txt', `Hello World ${i}\n`, { flag: 'a' });
}
