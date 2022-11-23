/** Async-Await is the best approach for asynchronous operations as it is most readable **/
const fs = require('fs').promises;
const { get } = require('http');
const util = require('util');

/***__ util.promisify(fn) takes a function 'fn' and returns a version that returns promises ___***/
//const readFilePromise = util.promisify(fs.readFile);
//const writeFilePromise = util.promisify(fs.writeFile);
const start = async () => {
  try {
    // await waits until a promise is settled
    const first = await fs.readFile('./content/async-await_1.txt', 'utf8');
    /*** Alternate "using util.promisify()" ***/
    //const first = await readFilePromise('./content/async-await_1.txt', 'utf8');
    const second = await fs.readFile('./content/async-await_2.txt', 'utf8');
    /*** Alternate "using util.promisify()" ***/
    //const second = await readFilePromise('./content/async-await_2.txt', 'utf8');
    //
    //console.log(first, second);

    await fs.writeFile('./content/async-await_3.txt', `This is Awesome: ${first} ${second}`);
    /*** Alternate "using util.promisify()" ***/
    //await writeFilePromise('./content/async-await_3.txt', `This is Awesome: ${first} ${second}`);

    const third = await fs.readFile('./content/async-await_3.txt', 'utf8');
    /*** Alternate "using util.promisify()" ***/
    //const third = await readFilePromise('./content/async-await_3.txt', 'utf8');

    console.log(first, second, third);
  } catch (error) {
    console.error(error);
  }
};
start();

/**** Promise version of above async-await approach **/

/* const getText = (path) => {
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

const firstPromiseArray = Promise.all([
  getText('./content/async-await_1.txt'),
  getText('./content/async-await_2.txt'),
])
  .then((texts) =>
    writeText('./content/async-await_3.txt', `This is awesome: ${texts[0]} ${texts[1]}`, {
      flag: 'w',
    }),
  )
  .catch((err) => console.error(err));

const secondPromiseArray = Promise.all([
  getText('./content/async-await_1.txt'),
  getText('./content/async-await_2.txt'),
  getText('./content/async-await_3.txt'),
])
  .then((text) => text)
  .catch((err) => console.error(err));

Promise.all([firstPromiseArray, secondPromiseArray])
  .then((texts) => console.log(texts[1][0], texts[1][1], texts[1][2]))
  .catch((err) => console.error(err));

*/
