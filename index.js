require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const setupSecurity = require('./middlewares/security'); // Seguridad

const { config } = require('./config/config'); // Importar configuración global
const sequelize = require('./db/database'); // Importar la conexión a la base de datos

// Inicialización de la aplicación
const app = express();
const port = config.port;

// Middleware para parseo de JSON
app.use(express.json());

// Aplicar configuraciones de seguridad
setupSecurity(app);

// Ruta de prueba para verificar si el servidor está corriendo
app.get('/', (req, res) => {
  res.send('Servidor Express en ejecución');
});

// Configurar rutas principales
routerApi(app);

// Middlewares de manejo de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Verificar la conexión con la base de datos antes de iniciar el servidor
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Conectado a la base de datos con éxito');
    // Iniciar el servidor solo si la base de datos está conectada
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar con la base de datos:', error);
    process.exit(1); // Detiene la ejecución si la base de datos no está disponible
  });
