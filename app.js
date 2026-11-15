const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.send('API de productos funcionando');
});

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/productos', require('./src/routes/productos'));

// Middleware para rutas que no existen
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error en el servidor' });
});

module.exports = app;