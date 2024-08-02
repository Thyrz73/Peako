require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
//const { MongoClient, ServerApiVersion } = require('mongodb');
const PORT = 3000;
const dbURI = process.env.DB_URI;

const corsMiddleware = require('./middlewares/corsMiddleware');
const logger = require('./logger');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/swaggerConfig');

const authRoutes = require('./routes/authRoutes');
const tasksRouter = require('./routes/routesSwagger'); //rename tasksRouter par ressource, 1 route file par ressource

const sessionConfig = require('./config/expressSession');
const passport = require('./config/passport');

app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session()); // Utilisé pour les sessions du site web

// Connexion à MongoDB
mongoose.connect(dbURI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// CORS
app.use(corsMiddleware);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Exemple de middleware pour loguer chaque requête
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send('Something went wrong');
});

// Route de base
app.get('/', (req, res) => {
  res.send('Hello World!');
  logger.info('Hello World route accessed');
});

// Route protégée racine --> besoin d'import de isAuthenticated et protectedController
//app.get('/protected-resource', isAuthenticated, protectedController.protectedResource);

app.use('/tasks', tasksRouter);

// Démarrage du serveur
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { app, server };