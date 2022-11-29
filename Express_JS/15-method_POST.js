const express = require('express');
const morgan = require('morgan');
let { people } = require('./data');
const app = express();

app.use(morgan('tiny'));

// ======================  XSS ATTACK ================
//<script>let url="https://i.ytimg.com/vi/TNV0_7QRDwY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCPImB3UFQg0HfZn3dR4F_agnegxg";let img=document.createElement('img');img.src=url;document.body.appendChild(img);</script>
// ===================================================
// static assets
app.use(express.static('../../node-express-course/02-express-tutorial/methods-public/'));

// parses incoming requests with urlencoded payloads and adds the values to req.body. NOTE: req.body will be undefined unless we write the below line of code
app.use(express.urlencoded({ extended: false }));

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post('/login', (req, res) => {
  const { name } = req.body;
  console.log('name = ', name);
  if (name) {
    //people = [...people, { id: people.length + 1, name: name }];
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send('Please Provide Credentials');
});
app.listen(3000, () => console.log('server is listening on port 3000'));
