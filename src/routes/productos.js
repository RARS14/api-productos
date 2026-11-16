const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth');
const {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/productosController');

// Todas las rutas de productos exigen un token válido
router.use(verificarToken);

router.get('/', obtenerProductos);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;