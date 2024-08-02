exports.protectedResource = (req, res) => {
    res.json({ message: 'Accès autorisé à la ressource protégée', user: req.user });
  };
  