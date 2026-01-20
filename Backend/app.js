// server.js o app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); 

const db = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const visitantesRoutes = require('./routes/visitantesRoutes');
const estacionRoutes = require('./routes/estacionRoutes');
const adminEstacionesRoutes = require('./routes/administracion/addEstacionesRoutes'); 

//const dataloggerRoutes1 = require('./routes/administracion/dataloggerRoutes_1');

const dataloggerRoutes = require('./routes/administracion/dataloggerRoutes');

const app = express();


app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/visitantes', visitantesRoutes);


//administracion
app.use('/api/estaciones', estacionRoutes);

//app.use('/api/datalogger', dataloggerRoutes1);

app.use('/api/datalogger', dataloggerRoutes);

app.use('/api/admin', adminEstacionesRoutes);




// Puerto desde .env o por defecto
const PORT = process.env.PORT || 3000;


db.connect()
  .then(client => {
    console.log('✅ Conexión a PostgreSQL establecida exitosamente');
    client.release(); 
  })
  .catch(err => {
    console.error('❌ Error al conectar a PostgreSQL:', err.message);
  });

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
