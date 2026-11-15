const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth');

// Todas las rutas de productos exigen un token válido
router.use(verificarToken);

router.get('/', (req, res) => {
  res.json({ mensaje: 'Lista de productos (temporal)' });
});

router.post('/', (req, res) => {
  res.status(201).json({ mensaje: 'Producto creado (temporal)' });
});

router.put('/:id', (req, res) => {
  res.json({ mensaje: `Producto ${req.params.id} actualizado (temporal)` });
});

router.delete('/:id', (req, res) => {
  res.json({ mensaje: `Producto ${req.params.id} eliminado (temporal)` });
});

module.exports = router;