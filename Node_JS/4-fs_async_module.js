const fs = require('fs');

fs.readFile('./content/fourth.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const first = data;
  fs.readFile('./content/fifth.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const second = data;
    fs.writeFile(
      './content/sixth.txt',
      `This file was created using "fs.writeFile()" inside 'fs_async_module.js' by reading 'fourth.txt' which was '${first}' and by reading 'fifth.txt' which was '${second}'`,
      { flag: 'w' },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
      },
    );
  });
});
