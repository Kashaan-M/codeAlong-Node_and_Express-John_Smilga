const fs = require('fs');
console.log('start (async)');
fs.readFile('./content/fourth.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const first = data;
  console.log(first);
  console.log('done with this task');
});

console.log('starting next task');
