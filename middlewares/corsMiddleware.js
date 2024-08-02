const cors = require('cors');
// Importer le logger
const logger = require('../logger');

const allowedOrigins = ['https://www.votresite.com', 'https://www.autredomaine.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  }
};

const corsMiddleware = (req, res, next) => {
  cors(corsOptions)(req, res, (err) => {
    if (err && err.message === 'Not allowed by CORS') {
      logger.warn(`not allowed by CORS`);
      res.status(403).json({ message: 'Not allowed by CORS' });
    } else if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      next();
    }
  });
};

module.exports = corsMiddleware;