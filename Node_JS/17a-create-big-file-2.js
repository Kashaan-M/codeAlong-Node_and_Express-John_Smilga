const fs = require('fs');

for (let i = 0; i < 100000; i++) {
  fs.writeFileSync('./content/big-2.txt', `Hello World ${i}\n`, { flag: 'a' });
}
