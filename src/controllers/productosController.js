const mongoose = require('mongoose');
const Producto = require('../models/Producto');

async function obtenerProductos(req, res, next) {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    next(err);
  }
}

async function crearProducto(req, res, next) {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    if (!nombre || precio === undefined) {
      return res.status(400).json({ mensaje: 'Faltan el nombre o el precio' });
    }
    const producto = await Producto.create({ nombre, descripcion, precio, stock });
    res.status(201).json(producto);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ mensaje: err.message });
    }
    next(err);
  }
}

async function actualizarProducto(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ mensaje: 'Id no válido' });
    }
    const producto = await Producto.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ mensaje: err.message });
    }
    next(err);
  }
}

async function eliminarProducto(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ mensaje: 'Id no válido' });
    }
    const producto = await Producto.findByIdAndDelete(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};