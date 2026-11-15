const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { usuario, password } = req.body;
    if (!usuario || !password) {
      return res.status(400).json({ mensaje: 'Faltan el usuario o la contraseña' });
    }
    const existe = await Usuario.findOne({ usuario });
    if (existe) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }
    const passwordEncriptada = await bcrypt.hash(password, 10);
    await Usuario.create({ usuario, password: passwordEncriptada });
    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { usuario, password } = req.body;
    if (!usuario || !password) {
      return res.status(400).json({ mensaje: 'Faltan el usuario o la contraseña' });
    }
    const encontrado = await Usuario.findOne({ usuario });
    if (!encontrado) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }
    const coincide = await bcrypt.compare(password, encontrado.password);
    if (!coincide) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }
    const token = jwt.sign(
      { id: encontrado._id, usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;