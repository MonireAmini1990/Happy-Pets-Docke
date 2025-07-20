const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Happy Pets!' });
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});