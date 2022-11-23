const fs = require('fs');
const first = fs.readFileSync('./content/first.txt', 'utf8');
const second = fs.readFileSync('./content/second.txt', 'utf8');

//console.log(first, second);
// Here we pass in {flag: 'a'} to append to third.txt. If we don't pass that {flag: 'a'} and third.txt didn't exist then node would've created third.txt and wrote
// our data( the second argument to fs.writeFileSync() ) to it
fs.writeFileSync('./content/third.txt', `Here is the result ${first}, ${second}`, {
  flag: 'a',
});
