const session = require('express-session');

if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET n\'est pas défini dans les variables d\'environnement.');
  }

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || 'monSecretDeSession', // Valeur à définir dans les variables d'environnement
  resave: false, // Ne sauvegarde pas la session si elle n'a pas été modifiée
  saveUninitialized: false, // Ne crée pas de session vide
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // Active secure pour HTTPS en production
    maxAge: 1000 * 60 * 60 * 24 // 1 jour en millisecondes
  }
});

module.exports = sessionConfig;
