const fs = require('fs');

const getText = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
const writeText = (path, text, options) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, text, options, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
// logs resolve data
getText('./content/promise_1.txt')
  .then((first) => {
    console.log(first);
    return getText('./content/promise_2.txt');
  })
  .then((second) => {
    console.log(second);
    return writeText(
      './content/promise_3.txt',
      `This is the 3rd promise created using fs.writeFile() asynchronous function(inside a Promise object)`,
      { flag: 'w' },
    );
  })
  .then((undef) => {
    // here we name the return value or previous Promise 'undef' because the return value after fs.writeFile() is successful is going to be undefined and
    // we won't use that value further(obviously)

    // get the text of promise_3.txt file. This will return a promise
    return getText('./content/promise_3.txt');
  })
  .then((third) => {
    // here third is the return value of getText() in last Promise.It represents the text inside promise_3.txt
    console.log(third);
  })
  .catch((err) => console.log(err));

/****---- catches reject error (because of a syntax error i.e. promise_11.txt doesn't exist) ----****/
getText('./content/promise_11.txt')
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
