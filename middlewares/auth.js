const passport = require('passport');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Accès refusé' });
    }
    req.user = user;
    return next();
  })(req, res, next);
}

module.exports = isAuthenticated;