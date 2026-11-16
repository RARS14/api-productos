const mongoose = require('mongoose');
const app = require('../app');

async function conectar() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = async (req, res) => {
  try {
    await conectar();
    return app(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al conectar con la base de datos' });
  }
};