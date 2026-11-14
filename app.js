const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.send('API de productos funcionando');
});

module.exports = app;