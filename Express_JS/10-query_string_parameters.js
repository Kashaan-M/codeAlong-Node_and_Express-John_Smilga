// Query String Parameters are also called URL Parameters
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
app.get('/api/v1/query', (req, res) => {
  //console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    if (limit <= sortedProducts.length) {
      sortedProducts = sortedProducts.slice(0, Number(limit));
    } else {
      return res.status(200).send('limit exceeded');
    }
  }
  if (sortedProducts.length < 1) {
    //res.status(200).send('No product matches your search');
    /** the industry approach to dealing with this situation when you have no result matching the 'search' **/
    return res.status(200).json({ success: true, data: [] });
  }

  //console.log('sorted', sortedProducts);
  return res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
