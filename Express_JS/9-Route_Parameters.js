const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
  res.send("<h1>Home Page</h1><a href='/api/products'>Products</a>");
});
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image, price } = product;
    let newProduct = { id, name, image, price };
    return newProduct;
  });
  res.json(newProducts);
});
app.get('/api/products/:productID', (req, res) => {
  //console.log(typeof req.params);  // example output: { productID : '1' }
  const { productID } = req.params;
  const theProduct = products.find((product) => product.id === Number(productID));
  if (!theProduct) {
    return res.status(404).send('<h2>Product Not Found</h2>');
  }
  res.json(theProduct);
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
