const authorize = (req, res, next) => {
  //console.log('authorized');
  const { user } = req.query;
  if (user === 'john') {
    req.user = { name: 'john', id: 4 };
    next();
  } else {
    res.status(401).send('unauthorized');
  }
};
module.exports = authorize;
