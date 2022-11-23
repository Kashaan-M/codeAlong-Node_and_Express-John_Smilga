/****************** Sync *******************/
const fs = require('fs');
console.log('start (sync)');
const first = fs.readFileSync('./content/first.txt', 'utf8');
const second = fs.readFileSync('./content/second.txt', 'utf8');

//console.log(first, second);
// Here we pass in {flag: 'a'} to append to third.txt. If we don't pass that {flag: 'a'} and third.txt didn't exist then node would've created third.txt and wrote
// our data( the second argument to fs.writeFileSync() ) to it
fs.writeFileSync('./content/third.txt', `Here is the result ${first}, ${second}`, {
  flag: 'a',
});
console.log('done with this task');
console.log('starting the next one');

/****************** Async *******************/
console.log('start (async)');
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
        console.log('done with this task');
      },
    );
  });
});

console.log('starting next task');
