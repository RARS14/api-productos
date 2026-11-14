require('dotenv').config();
const app = require('./app');
const conectarDB = require('./src/config/db');

const PORT = process.env.PORT || 3000;

conectarDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err.message);
  });